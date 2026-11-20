import { ApolloServer } from '@apollo/server'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { plugin as ws } from 'crossws/server'
import { type Client, createClient, type ServerOptions } from 'graphql-ws'
import { H3, serve, type WebSocketHooks } from 'h3'
import { EventEmitter, on, once } from 'node:events'
import { setInterval } from 'node:timers/promises'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import { startServerAndCreateH3Handler } from '../src'
import { defineGraphqlWebSocket, defineGraphqlWebSocketHandler } from '../src/websocket'

interface Context {
  user?: string
}

// The test emits `event` to push a value to the `events` subscription and `end` to complete it
let events = new EventEmitter()
let cleanedUp: Promise<void>
let markCleanedUp: () => void

const schema = makeExecutableSchema<Context>({
  typeDefs: `#graphql
    type Query {
      hello: String
    }
    type Subscription {
      count: Int
      events: String
      ticks: Int
      whoami: String
      boom: Int
    }
  `,
  resolvers: {
    Query: {
      hello: () => 'world',
    },
    Subscription: {
      count: {
        async *subscribe() {
          for (let count = 1; count <= 3; count++) {
            yield { count }
          }
        },
      },
      events: {
        async *subscribe() {
          // `on` buffers events from now on, so the test can start emitting once it sees `subscribed`
          const stream = on(events, 'event', { close: ['end'] })
          events.emit('subscribed')
          for await (const [event] of stream) {
            yield { events: event }
          }
        },
      },
      ticks: {
        async *subscribe() {
          let tick = 0
          try {
            for await (const _ of setInterval(5)) {
              yield { ticks: ++tick }
            }
          } finally {
            markCleanedUp()
          }
        },
      },
      whoami: {
        async *subscribe(_parent: unknown, _args: unknown, context: Context) {
          yield { whoami: context.user }
        },
      },
      boom: {
        // oxlint-disable-next-line require-yield
        async *subscribe() {
          throw new Error('kaboom')
        },
      },
    },
  },
})

const countResults = [{ data: { count: 1 } }, { data: { count: 2 } }, { data: { count: 3 } }]

let server: ReturnType<typeof serve> | undefined
let clients: Client[] = []

beforeEach(() => {
  events = new EventEmitter()
  cleanedUp = new Promise((resolve) => (markCleanedUp = resolve))
})

afterEach(async () => {
  await Promise.all(
    clients.map(async (client) => {
      await client.dispose()
    }),
  )
  clients = []
  await server?.close(true)
  server = undefined
})

async function listen(
  websocket: Partial<WebSocketHooks> = defineGraphqlWebSocket({ schema }),
): Promise<string> {
  const app = new H3()
  app.all('/api', startServerAndCreateH3Handler(new ApolloServer({ schema }), { websocket }))
  return listenApp(app, '/api')
}

async function listenApp(app: H3, path: string): Promise<string> {
  server = serve(app, { port: 0, hostname: 'localhost', plugins: [ws({})], silent: true })
  await server.ready()
  // oxlint-disable-next-line typescript/no-non-null-assertion
  return server.url!.replace(/^http/, 'ws').replace(/\/$/, '') + path
}

function connect(url: string, connectionParams?: Record<string, unknown>): Client {
  const client = createClient({ url, connectionParams, retryAttempts: 0 })
  clients.push(client)
  return client
}

async function collect(client: Client, query: string): Promise<unknown[]> {
  const results: unknown[] = []
  for await (const result of client.iterate({ query })) {
    results.push(result)
  }
  return results
}

/** Opens a raw WebSocket, without the graphql-ws client, and resolves with how it was closed. */
async function closeOf(url: string, protocol?: string): Promise<{ code: number; reason: string }> {
  return new Promise((resolve) => {
    const socket = new WebSocket(url, protocol)
    socket.addEventListener('close', ({ code, reason }) => resolve({ code, reason }))
  })
}

describe('websocket', () => {
  it('serves http and websocket requests on the same route', async () => {
    const url = await listen()

    const response = await fetch(url.replace(/^ws/, 'http'), {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ query: '{ hello }' }),
    })
    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ data: { hello: 'world' } })

    expect(await collect(connect(url), 'subscription { count }')).toEqual(countResults)
  })

  it('serves subscriptions with a standalone websocket handler', async () => {
    const app = new H3()
    app.get('/_ws', await defineGraphqlWebSocketHandler({ schema }))
    const url = await listenApp(app, '/_ws')

    expect(await collect(connect(url), 'subscription { count }')).toEqual(countResults)
  })
})

describe('subscriptions', () => {
  it('delivers events that are published after subscribing', async () => {
    const url = await listen()
    const subscription = connect(url).iterate({ query: 'subscription { events }' })

    const subscribed = once(events, 'subscribed')
    const first = subscription.next()
    await subscribed
    events.emit('event', 'first')
    expect(await first).toEqual({ done: false, value: { data: { events: 'first' } } })

    events.emit('event', 'second')
    expect(await subscription.next()).toEqual({
      done: false,
      value: { data: { events: 'second' } },
    })

    // Completing on the server ends the subscription on the client
    events.emit('end')
    expect(await subscription.next()).toEqual({ done: true, value: undefined })
  })

  it('stops the server-side iterator when the client unsubscribes', async () => {
    const url = await listen()
    const results: unknown[] = []
    for await (const result of connect(url).iterate({ query: 'subscription { ticks }' })) {
      results.push(result)
      if (results.length === 3) {
        break
      }
    }

    expect(results).toEqual([
      { data: { ticks: 1 } },
      { data: { ticks: 2 } },
      { data: { ticks: 3 } },
    ])
    await expect(cleanedUp).resolves.toBeUndefined()
  })

  it('reports errors thrown by the subscription resolver', async () => {
    const url = await listen()

    await expect(collect(connect(url), 'subscription { boom }')).rejects.toEqual([
      expect.objectContaining({ message: 'kaboom' }),
    ])
  })

  it('reports validation errors', async () => {
    const url = await listen()

    await expect(collect(connect(url), 'subscription { unknown }')).rejects.toEqual([
      expect.objectContaining({ message: 'Cannot query field "unknown" on type "Subscription".' }),
    ])
  })
})

describe('authentication', () => {
  const options: ServerOptions<{ token?: string }> = {
    schema,
    onConnect: ({ connectionParams }) => connectionParams?.token === 'secret',
    context: ({ connectionParams }): Context => ({ user: connectionParams?.token }),
  }

  it('passes connection params to the context', async () => {
    const url = await listen(defineGraphqlWebSocket(options))

    expect(await collect(connect(url, { token: 'secret' }), 'subscription { whoami }')).toEqual([
      { data: { whoami: 'secret' } },
    ])
  })

  it('closes the connection when onConnect rejects it', async () => {
    const url = await listen(defineGraphqlWebSocket(options))

    await expect(
      collect(connect(url, { token: 'wrong' }), 'subscription { whoami }'),
    ).rejects.toHaveProperty('code', 4403)
  })

  it('accepts a custom upgrade hook that delegates to the graphql-ws one', async () => {
    const hooks = defineGraphqlWebSocket({ schema })
    const url = await listen({
      ...hooks,
      async upgrade(request) {
        if (new URL(request.url).searchParams.get('key') !== 'secret') {
          throw new Response('Unauthorized', { status: 401 })
        }
        return hooks.upgrade?.(request)
      },
    })

    expect(await collect(connect(`${url}?key=secret`), 'subscription { count }')).toEqual(
      countResults,
    )
    // The handshake fails, so the socket never opens and closes abnormally
    expect(await closeOf(`${url}?key=wrong`, 'graphql-transport-ws')).toEqual({
      code: 1006,
      reason: '',
    })
  })
})

describe('protocol', () => {
  it('closes connections that do not request the graphql-transport-ws subprotocol', async () => {
    const url = await listen()

    expect(await closeOf(url)).toEqual({ code: 4406, reason: 'Subprotocol not acceptable' })
  })
})
