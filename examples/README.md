# WebSocket

This example demonstrates how to use the `graphql-ws` package to enable WebSockets in Apollo Server via `h3`.
It is based on the [Apollo Server WebSocket example](https://www.apollographql.com/docs/apollo-server/data/subscriptions#basic-runnable-example).

Run the following command to start the server and open the Apollo Sandbox in the browser:

```sh
pnpm example:websocket
```

The server is configured to serve the Apollo Sandbox, the GraphQL http endpoint and the WebSocket endpoint on the root path. Additionally, a standalone WebSocket endpoint without the http handler is served on the `/_ws` path.

Then test the WebSocket connection by running the following query:

```graphql
subscription Subscription {
  numberIncremented
}
```
