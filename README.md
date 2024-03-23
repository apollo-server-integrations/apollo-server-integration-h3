# Apollo Server integration for h3 and nuxt

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Github Actions][github-actions-src]][github-actions-href]
[![Codecov][codecov-src]][codecov-href]

This package allows you to easily integrate [Apollo Server](https://www.apollographql.com/docs/apollo-server/) with your [h3](https://github.com/unjs/h3) or [Nuxt 3](v3.nuxtjs.org) application.

> For defining a GraphQL server in Nuxt 3, you may want to have a look at the [GraphQL server toolkit Nuxt module](https://github.com/tobiasdiez/nuxt-graphql-server).

## Installation

```sh
# npm
npm install @apollo/server graphql @as-integrations/h3

# yarn
yarn add @apollo/server graphql @as-integrations/h3

# pnpm
pnpm add @apollo/server graphql @as-integrations/h3
```

## Usage with Nuxt v3

Create a [Server API Route](https://v3.nuxtjs.org/guide/directory-structure/server#api-routes) that configures an instance of Apollo Server as described in the [documentation](https://www.apollographql.com/docs/apollo-server/getting-started#step-6-create-an-instance-of-apolloserver) and then exports it as the event handler:

```js
import { ApolloServer } from '@apollo/server'
import { startServerAndCreateH3Handler } from '@as-integrations/h3'

const apollo = new ApolloServer({
  // Specify server options like schema and resolvers here
})

export default startServerAndCreateH3Handler(apollo, {
  // Optional: Specify context
  context: (event) => {...}
})
```

## Usage with h3

Create and configure an instance of Apollo Server as described in the [documentation](https://www.apollographql.com/docs/apollo-server/getting-started#step-6-create-an-instance-of-apolloserver) and then register it as a route handler in your `h3` application.

```js
import { createApp } from 'h3'
import { ApolloServer } from '@apollo/server'
import { startServerAndCreateH3Handler } from '@as-integrations/h3'

const apollo = new ApolloServer({
  // Specify server options like schema and resolvers here
})

export const app = createApp()
app.use(
  '/api',
  startServerAndCreateH3Handler(apollo, {
    // Optional: Specify context
    context: (event) => {...}
  })
)
```

Then run your h3 server as usual, e.g. with `npx --yes listhen -w --open ./app.ts`.
Visit http://localhost:3000/api in your browser to access the Apollo Sandbox.

## Subscriptions with WebSockets

This package also supports subscriptions over WebSockets. To enable this feature, you need to install the `graphql-ws` package:

```sh
# npm
npm install graphql-ws

# yarn
yarn add graphql-ws

# pnpm
pnpm add graphql-ws
```

Then you can add a WebSocket handler to your `h3` app using the `defineGraphqlWebSocketHandler` or `defineGraphqlWebSocket` functions from this package. Here is an example that combines the HTTP and WebSocket handlers in a single app.

```js
import { createApp } from 'h3'
import { ApolloServer } from '@apollo/server'
import { startServerAndCreateH3Handler, defineGraphqlWebSocketHandler } from '@as-integrations/h3'
import { makeExecutableSchema } from '@graphql-tools/schema'

// Define your schema and resolvers
const typeDefs = `...`
const resolvers = { ... }
const schema = makeExecutableSchema({ typeDefs, resolvers })

const apollo = new ApolloServer({ schema })

export const app = createApp()
app.use(
  '/api',
  startServerAndCreateH3Handler(apollo)
)
app.use(
  '/api/_ws',
  defineGraphqlWebSocketHandler({ schema })
)
```

Then you can connect to the WebSocket endpoint using the Apollo Sandbox or any other client that supports the `graphql-ws` protocol.

See the [WebSocket example](./examples/websocket.ts) for a complete example.

## 💻 Development

- Clone this repository
- Enable [Corepack](https://github.com/nodejs/corepack) using `corepack enable` (use `npm i -g corepack` for Node.js < 16.10).
- Install dependencies using `pnpm install`.
- Run tests using `pnpm test` and integration tests via `pnpm test:integration`.

## License

Made with 💛

Published under [MIT License](./LICENSE).

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/@as-integrations/h3?style=flat-square
[npm-version-href]: https://npmjs.com/package/@as-integrations/h3
[npm-downloads-src]: https://img.shields.io/npm/dm/@as-integrations/h3?style=flat-square
[npm-downloads-href]: https://npmjs.com/package/@as-integrations/h3
[github-actions-src]: https://img.shields.io/github/workflow/status/apollo-server-integrations/apollo-server-integration-h3/ci/main?style=flat-square
[github-actions-href]: https://github.com/apollo-server-integrations/apollo-server-integration-h3/actions?query=workflow%3Aci
[codecov-src]: https://img.shields.io/codecov/c/gh/apollo-server-integrations/apollo-server-integration-h3/main?style=flat-square
[codecov-href]: https://codecov.io/gh/apollo-server-integrations/apollo-server-integration-h3
