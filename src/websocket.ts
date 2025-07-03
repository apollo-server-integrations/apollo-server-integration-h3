import {
  ServerOptions,
  ConnectionInitMessage,
} from 'graphql-ws'
import { makeHooks } from 'graphql-ws/use/crossws'

import {
  defineWebSocketHandler,
  EventHandler,
  EventHandlerRequest,
} from 'h3'

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
  closed: (code: number, reason: string) => Promise<void>
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
>(options: ServerOptions<P, Extra & Partial<E>>) {
  return makeHooks(options);
}
/**
 * Create a event handler to be used with [h3](https://h3.unjs.io/).
 *
 * @category Server/h3
 */
export function defineGraphqlWebSocketHandler<
  P extends ConnectionInitMessage['payload'] = ConnectionInitMessage['payload'],
  E extends Record<PropertyKey, unknown> = Record<PropertyKey, never>,
>(
  options: ServerOptions<P, Extra & Partial<E>>,
): EventHandler<EventHandlerRequest, never> {
  return defineWebSocketHandler(defineGraphqlWebSocket(options))
}
