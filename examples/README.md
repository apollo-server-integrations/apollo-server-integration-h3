# WebSocket

This example demonstrates how to use the `graphql-ws` package to enable WebSockets in Apollo Server via `h3`.
It is based on the [Apollo Server WebSocket example](https://www.apollographql.com/docs/apollo-server/data/subscriptions#basic-runnable-example).

Run the following command to start the server and open the Apollo Sandbox in the browser:

```sh
pnpm example:websocket
```

The server is configured to listen for WebSocket connections on the `/ws` path and to serve the Apollo Sandbox (and the GraphQL http endpoint) on the `/ws` path. (It is currently not possible to serve both the WebSocket and the HTTP endpoint on the root path, see [this h3 issue](https://github.com/unjs/h3/issues/719).)

Then test the WebSocket connection by running the following query:

```graphql
subscription Subscription {
  numberIncremented
}
```
