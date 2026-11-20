import type { ApolloServer, BaseContext, ContextFunction, HTTPGraphQLRequest } from '@apollo/server'
import { HeaderMap } from '@apollo/server'
import {
  defineHandler,
  defineWebSocketHandler,
  type EventHandler,
  H3Event,
  type HTTPMethod,
  isMethod,
  noContent,
  type WebSocketHooks,
} from 'h3'
import type { WithRequired } from '@apollo/utils.withrequired'

export interface H3ContextFunctionArgument {
  event: H3Event
}

export interface H3HandlerOptions<TContext extends BaseContext> {
  context?: ContextFunction<[H3ContextFunctionArgument], TContext>
  websocket?: Partial<WebSocketHooks>
}

const defaultContext: ContextFunction<[H3ContextFunctionArgument], any> = () => Promise.resolve({})

export function startServerAndCreateH3Handler(
  server: ApolloServer,
  options?: H3HandlerOptions<BaseContext>,
): EventHandler
export function startServerAndCreateH3Handler<TContext extends BaseContext>(
  server: ApolloServer<TContext>,
  options: WithRequired<H3HandlerOptions<TContext>, 'context'>,
): EventHandler
export function startServerAndCreateH3Handler<TContext extends BaseContext>(
  server: ApolloServer<TContext>,
  options?: H3HandlerOptions<TContext>,
): EventHandler {
  server.startInBackgroundHandlingStartupErrorsByLoggingAndFailingAllRequests()

  const contextFunction: ContextFunction<[H3ContextFunctionArgument], TContext> =
    options?.context ?? defaultContext

  const handler = defineHandler(async (event) => {
    // Apollo-server doesn't handle OPTIONS calls, so we have to do this on our own
    // https://github.com/apollographql/apollo-server/blob/fa82c1d5299c4803f9ef8ae7fa2e367eadd8c0e6/packages/server/src/runHttpQuery.ts#L182-L192
    if (isMethod(event, 'OPTIONS')) {
      return noContent()
    }

    try {
      const graphqlRequest = await toGraphqlRequest(event)
      const { body, headers, status } = await server.executeHTTPGraphQLRequest({
        httpGraphQLRequest: graphqlRequest,
        context: () => contextFunction({ event }),
      })

      if (body.kind === 'chunked') {
        throw new Error('Incremental delivery not implemented')
      }

      for (const [key, value] of headers) {
        event.res.headers.set(key, value)
      }
      event.res.status = status || 200
      return body.string
    } catch (error) {
      if (error instanceof SyntaxError) {
        // This is what the apollo test suite expects
        event.res.status = 400
        return error.message
      } else {
        throw error
      }
    }
  })

  // Upgrade requests are passed to the websocket hooks, all others to the http handler
  return options?.websocket ? defineWebSocketHandler(options.websocket, handler) : handler
}

async function toGraphqlRequest(event: H3Event): Promise<HTTPGraphQLRequest> {
  return {
    method: event.req.method,
    headers: normalizeHeaders(event.req.headers),
    search: event.url.search.slice(1),
    body: await normalizeBody(event),
  }
}

function normalizeHeaders(headers: Headers): HeaderMap {
  const headerMap = new HeaderMap()
  for (const [key, value] of headers) {
    headerMap.set(key, value)
  }
  return headerMap
}

async function normalizeBody(event: H3Event): Promise<unknown> {
  const PayloadMethods: HTTPMethod[] = ['PATCH', 'POST', 'PUT', 'DELETE']
  if (!isMethod(event, PayloadMethods)) {
    return undefined
  }
  // Only parse JSON bodies, Apollo rejects requests with other content types
  const contentType = event.req.headers.get('content-type')?.toLowerCase()
  if (contentType?.startsWith('application/json')) {
    return await event.req.json()
  }
  return await event.req.text()
}
