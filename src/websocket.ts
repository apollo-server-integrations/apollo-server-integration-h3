import type { ConnectionInitMessage, ServerOptions } from 'graphql-ws'
import { makeHooks, type Extra } from 'graphql-ws/use/crossws'
import {
  defineWebSocketHandler,
  type EventHandler,
  type EventHandlerRequest,
  type WebSocketHooks,
  type WebSocketResponse,
} from 'h3'

export type { Extra } from 'graphql-ws/use/crossws'

/**
 * Create the WebSocket hooks to be used with [h3](https://h3.unjs.io/).
 *
 * Use this over {@link defineGraphqlWebSocketHandler} if you need more control over the WebSocket server or
 * if you want to add custom hooks (e.g. for authentication or logging).
 * When overriding the `upgrade` hook, make sure to still accept the `graphql-transport-ws` subprotocol,
 * e.g. by returning the result of the `upgrade` hook defined here.
 */
export function defineGraphqlWebSocket<
  P extends ConnectionInitMessage['payload'] = ConnectionInitMessage['payload'],
  E extends Record<PropertyKey, unknown> = Record<PropertyKey, never>,
>(options: ServerOptions<P, Extra & Partial<E>>): Partial<WebSocketHooks> {
  return makeHooks(options)
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
): Promise<EventHandler<EventHandlerRequest, WebSocketResponse>> {
  return defineWebSocketHandler(defineGraphqlWebSocket(options))
}
