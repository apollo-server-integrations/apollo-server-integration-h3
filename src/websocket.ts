import {
  makeServer,
  DEPRECATED_GRAPHQL_WS_PROTOCOL,
  CloseCode,
  ServerOptions,
  ConnectionInitMessage,
} from 'graphql-ws'
import {
  defineWebSocket,
  defineWebSocketHandler,
  EventHandler,
  EventHandlerRequest,
} from 'h3'
// TODO: Import from h3 once it's exposed there
// Then also remove the explicit reference to crossws as a dependency in package.json
// https://github.com/unjs/h3/issues/716
import type { Hooks, Peer } from 'crossws'

/**
 * The extra that will be put in the `Context`.
 *
 * @category Server/h3
 */
export interface Extra {
  /**
   * The underlying WebSocket peer.
   */
  readonly peer: Peer
}

/**
 * Graphql-ws interface is designed to work well for the case where the WebSocket server
 * exposes hooks per connection, but h3 only exposes hooks per server.
 * This is a workaround to make it work with h3.
 */
interface Client {
  handleMessage: (data: string) => Promise<void>
  closed: (code?: number, reason?: string) => Promise<void>
}

/**
 * Create the WebSocket hooks to be used with [h3](https://h3.unjs.io/).
 *
 * Use this over {@link defineGraphqlWebSocketHandler} if you need more control over the WebSocket server or
 * if you want to add custom hooks (e.g. for authentication or logging).
 */
export function defineGraphqlWebSocket<
  P extends ConnectionInitMessage['payload'] = ConnectionInitMessage['payload'],
  E extends Record<PropertyKey, unknown> = Record<PropertyKey, never>,
>(options: ServerOptions<P, Extra & Partial<E>>): Partial<Hooks> {
  const server = makeServer(options)
  const peers = new WeakMap<Peer, Client>()
  return defineWebSocket({
    open(peer) {
      const client: Client = {
        handleMessage: () => {
          throw new Error('Message received before handler was registered')
        },
        closed: () => {
          throw new Error('Closed before handler was registered')
        },
      }

      client.closed = server.opened(
        {
          protocol: peer.request.headers?.get('Sec-WebSocket-Protocol') ?? '',
          send: (message) => {
            // The peer might have been destroyed in the meantime, send only if exists
            if (peers.has(peer)) {
              peer.send(message)
            }
          },
          close: (code, reason) => {
            if (peers.has(peer)) {
              peer.close(code, reason)
            }
          },
          onMessage: (cb) => (client.handleMessage = cb),
        },
        { peer } as Extra & Partial<E>,
      )
      peers.set(peer, client)
    },
    message(peer, message) {
      const client = peers.get(peer)
      if (!client) throw new Error('Message received for a missing client')
      return client.handleMessage(message.text())
    },
    close(peer, details) {
      const client = peers.get(peer)
      if (!client) throw new Error('Closing a missing client')
      const upgradeProtocol = peer.request.headers?.get(
        'Sec-WebSocket-Protocol',
      )
      if (
        details.code === CloseCode.SubprotocolNotAcceptable &&
        upgradeProtocol === DEPRECATED_GRAPHQL_WS_PROTOCOL
      )
        console.warn(
          `Client provided the unsupported and deprecated subprotocol "${upgradeProtocol}" used by subscriptions-transport-ws.` +
            'Please see https://www.apollographql.com/docs/apollo-server/data/subscriptions/#switching-from-subscriptions-transport-ws.',
        )
      return client.closed(details.code, details.reason)
    },
  })
}
/**
 * Create a event handler to be used with [h3](https://h3.unjs.io/).
 *
 * @category Server/h3
 */
export async function defineGraphqlWebSocketHandler<
  P extends ConnectionInitMessage['payload'] = ConnectionInitMessage['payload'],
  E extends Record<PropertyKey, unknown> = Record<PropertyKey, never>,
>(
  options: ServerOptions<P, Extra & Partial<E>>,
): Promise<EventHandler<EventHandlerRequest, never>> {
  return defineWebSocketHandler(defineGraphqlWebSocket(options))
}
