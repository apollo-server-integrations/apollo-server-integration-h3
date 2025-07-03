import { ServerOptions, ConnectionInitMessage } from 'graphql-ws'
import { makeHooks } from 'graphql-ws/use/crossws'

import { defineWebSocketHandler, EventHandler, EventHandlerRequest } from 'h3'

export type { Extra } from 'graphql-ws/use/crossws'

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
): Promise<EventHandler<EventHandlerRequest, never>> {
  return defineWebSocketHandler(defineGraphqlWebSocket(options))
}
