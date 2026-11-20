import type { ConnectionInitMessage } from 'graphql-ws'
import { makeHooks } from 'graphql-ws/use/crossws'
import {
  defineWebSocketHandler,
  type EventHandler,
  type EventHandlerRequest,
  type WebSocketHooks,
  type WebSocketResponse,
} from 'h3'

export type { Extra } from 'graphql-ws/use/crossws'

/**
 * Options of {@link defineGraphqlWebSocket} and {@link defineGraphqlWebSocketHandler}: the `ServerOptions` of
 * graphql-ws, plus `isProd`.
 */
export type GraphqlWebSocketOptions<
  P extends ConnectionInitMessage['payload'] = ConnectionInitMessage['payload'],
  E extends Record<PropertyKey, unknown> = Record<PropertyKey, never>,
> = Parameters<typeof makeHooks<P, E>>[0]

/**
 * Create the WebSocket hooks to be used with [h3](https://h3.unjs.io/).
 *
 * Use this over {@link defineGraphqlWebSocketHandler} if you need more control over the WebSocket server or
 * if you want to add custom hooks (e.g. for authentication or logging).
 * When overriding the `upgrade` hook, make sure to still accept the `graphql-transport-ws` subprotocol,
 * e.g. by returning the result of the `upgrade` hook defined here.
 *
 * @param options The `ServerOptions` of graphql-ws, plus `isProd`: whether the server runs in production,
 * defaulting to `process.env.NODE_ENV === 'production'`. When an error is thrown while handling a message
 * (e.g. in `onSubscribe`), the connection is closed with code 4500. In production the reason of that close is
 * "Internal server error"; otherwise it is the error message, which might contain sensitive information.
 */
export function defineGraphqlWebSocket<
  P extends ConnectionInitMessage['payload'] = ConnectionInitMessage['payload'],
  E extends Record<PropertyKey, unknown> = Record<PropertyKey, never>,
>(options: GraphqlWebSocketOptions<P, E>): Partial<WebSocketHooks> {
  return makeHooks<P, E>(options)
}
/**
 * Create a event handler to be used with [h3](https://h3.unjs.io/).
 *
 * @param options The `ServerOptions` of graphql-ws, plus `isProd`; see {@link defineGraphqlWebSocket}.
 * @category Server/h3
 */
export async function defineGraphqlWebSocketHandler<
  P extends ConnectionInitMessage['payload'] = ConnectionInitMessage['payload'],
  E extends Record<PropertyKey, unknown> = Record<PropertyKey, never>,
>(
  options: GraphqlWebSocketOptions<P, E>,
): Promise<EventHandler<EventHandlerRequest, WebSocketResponse>> {
  return defineWebSocketHandler(defineGraphqlWebSocket<P, E>(options))
}
