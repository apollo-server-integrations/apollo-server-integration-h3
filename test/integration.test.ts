import {
  CreateServerForIntegrationTestsOptions,
  defineIntegrationTestSuite,
} from '@apollo/server-integration-testsuite'
import { createApp, toNodeListener } from 'h3'
import { ApolloServer, ApolloServerOptions, BaseContext } from '@apollo/server'
import { startServerAndCreateH3Handler } from '../src'
import { createServer, Server } from 'http'
import { AddressInfo } from 'net'
import { format } from 'url'
import { describe, it, expect } from '@jest/globals'

describe('integration:apollo-server-h3', () => {
  it('says hello', () => {
    expect(1).toBe(1)
  })
})
defineIntegrationTestSuite(
  async (
    serverOptions: ApolloServerOptions<BaseContext>,
    testOptions?: CreateServerForIntegrationTestsOptions,
  ) => {
    const app = createApp()
    const apollo = new ApolloServer({
      ...serverOptions,
    })
    app.use(
      '/',
      startServerAndCreateH3Handler(apollo, {
        context: testOptions?.context,
      }),
    )

    const httpServer = createServer(toNodeListener(app))
    await new Promise<void>((resolve) => {
      httpServer.listen({ port: 0 }, resolve)
    })

    return {
      server: apollo,
      url: urlForHttpServer(httpServer),
      async extraCleanup() {
        await new Promise<void>((resolve) => {
          httpServer.close(() => resolve())
        })
      },
    }
  },
  {
    serverIsStartedInBackground: true,
    noIncrementalDelivery: true,
  },
)

// Stolen from apollo server integration tests
export function urlForHttpServer(httpServer: Server): string {
  const { address, port } = httpServer.address() as AddressInfo

  // Convert IPs which mean "any address" (IPv4 or IPv6) into localhost
  // corresponding loopback ip. Note that the url field we're setting is
  // primarily for consumption by our test suite. If this heuristic is wrong for
  // your use case, explicitly specify a frontend host (in the `host` option
  // when listening).
  const hostname = address === '' || address === '::' ? 'localhost' : address

  return format({
    protocol: 'http',
    hostname,
    port,
    pathname: '/',
  })
}
