import { ApolloServer } from '@apollo/server'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { plugin as ws } from 'crossws/server'
import { createClient } from 'graphql-ws'
import { H3, serve } from 'h3'
import { afterEach, describe, expect, it } from '@jest/globals'
import { startServerAndCreateH3Handler } from '../src'
import { defineGraphqlWebSocket, defineGraphqlWebSocketHandler } from '../src/websocket'

const schema = makeExecutableSchema({
  typeDefs: `#graphql
    type Query {
      hello: String
    }
    type Subscription {
      count: Int
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
    },
  },
})

let server: ReturnType<typeof serve> | undefined

afterEach(async () => {
  await server?.close(true)
  server = undefined
})

async function listen(app: H3): Promise<string> {
  server = serve(app, { port: 0, hostname: 'localhost', plugins: [ws({})], silent: true })
  await server.ready()
  // oxlint-disable-next-line typescript/no-non-null-assertion
  return server.url!.replace(/\/$/, '')
}

async function subscribe(url: string): Promise<unknown[]> {
  const client = createClient({ url })
  const results: unknown[] = []
  try {
    for await (const result of client.iterate({ query: 'subscription { count }' })) {
      results.push(result)
    }
  } finally {
    await client.dispose()
  }
  return results
}

const expectedResults = [{ data: { count: 1 } }, { data: { count: 2 } }, { data: { count: 3 } }]

describe('websocket', () => {
  it('serves http and websocket requests on the same route', async () => {
    const app = new H3()
    app.all(
      '/api',
      startServerAndCreateH3Handler(new ApolloServer({ schema }), {
        websocket: defineGraphqlWebSocket({ schema }),
      }),
    )
    const url = (await listen(app)) + '/api'

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ query: '{ hello }' }),
    })
    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ data: { hello: 'world' } })

    expect(await subscribe(url.replace(/^http/, 'ws'))).toEqual(expectedResults)
  })

  it('serves subscriptions with a standalone websocket handler', async () => {
    const app = new H3()
    app.get('/_ws', await defineGraphqlWebSocketHandler({ schema }))
    const url = (await listen(app)) + '/_ws'

    expect(await subscribe(url.replace(/^http/, 'ws'))).toEqual(expectedResults)
  })
})
