# Apollo Server integration for h3 and nuxt

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Github Actions][github-actions-src]][github-actions-href]
[![Codecov][codecov-src]][codecov-href]

This package allows you to easily integrate [Apollo Server](https://www.apollographql.com/docs/apollo-server/) with your [h3](https://github.com/unjs/h3) or [nuxt](v3.nuxtjs.org) application.

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
  // Specify server options here
})

export default startServerAndCreateH3Handler(apollo, {
  // Optional: Specify context
  context: (event) => {...}
})
```

## Usage with h3

Create and configure an instance of Apollo Server as described in the [documentation](https://www.apollographql.com/docs/apollo-server/getting-started#step-6-create-an-instance-of-apolloserver) and then register it as a route handler in your `h3` application.

```js
import { createApp, toNodeListener } from 'h3'
import { ApolloServer } from '@apollo/server'
import { startServerAndCreateH3Handler } from '@as-integrations/h3'

const apollo = new ApolloServer({
  // Specify server options here
})

const app = createApp()
app.use(
  '/api',
  startServerAndCreateH3Handler(apollo, {
    // Optional: Specify context
    context: (event) => {...}
  })
)

createServer(toNodeListener(app)).listen(process.env.PORT || 3000)
```

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
