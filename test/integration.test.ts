import {
  CreateServerForIntegrationTestsOptions,
  defineIntegrationTestSuite,
} from '@apollo/server-integration-testsuite'
import { H3, toNodeHandler } from 'h3'
import { ApolloServer, ApolloServerOptions, BaseContext } from '@apollo/server'
import { startServerAndCreateH3Handler } from '../src'
import { createServer, Server } from 'node:http'
import { AddressInfo } from 'node:net'
import { format } from 'node:url'
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
    const app = new H3()
    const apollo = new ApolloServer({
      ...serverOptions,
    })
    app.use(
      '/',
      startServerAndCreateH3Handler(apollo, {
        context: testOptions?.context,
      }),
    )

    const httpServer = createServer(toNodeHandler(app))
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
function urlForHttpServer(httpServer: Server): string {
  // oxlint-disable-next-line typescript/no-unsafe-type-assertion
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
