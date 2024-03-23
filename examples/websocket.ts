// This is an adaption of the "official" example of how to use subscriptions with Apollo server
// https://github.com/apollographql/docs-examples/tree/main/apollo-server/v4/subscriptions-graphql-ws
import { ApolloServer } from '@apollo/server'
import { PubSub } from 'graphql-subscriptions'
import { createApp, defineWebSocketHandler } from 'h3'
import { startServerAndCreateH3Handler } from '../src'
import { defineGraphqlWebSocket } from '../src/websocket'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'

const pubsub = new PubSub()

// A number that we'll increment over time to simulate subscription events
let currentNumber = 0

// Schema definition
const typeDefs = `#graphql
  type Query {
    currentNumber: Int
  }

  type Subscription {
    numberIncremented: Int
  }
`

// Resolver map
const resolvers = {
  Query: {
    currentNumber() {
      return currentNumber
    },
  },
  Subscription: {
    numberIncremented: {
      subscribe: () => pubsub.asyncIterator(['NUMBER_INCREMENTED']),
    },
  },
}

// Create schema, which will be used separately by ApolloServer and
// the WebSocket server.
const schema = makeExecutableSchema({ typeDefs, resolvers })

// Create an h3 app; we will attach the WebSocket
// server and the ApolloServer to it.
export const app = createApp()

// Set up ApolloServer.
const apollo = new ApolloServer({
  schema,
  plugins: [
    ApolloServerPluginLandingPageLocalDefault({
      // This is needed to be able to change the ws endpoint
      embed: { endpointIsEditable: true },
    }),
  ],
})

app.use('/', [startServerAndCreateH3Handler(apollo, {})])
// TODO: Move this to the root handler, once https://github.com/unjs/h3/issues/719 is fixed
// Then we can also remove the landing page plugin above
app.use(
  '/_ws',
  defineWebSocketHandler({
    ...defineGraphqlWebSocket({ schema }),
    error(peer, error) {
      // eslint-disable-next-line no-console
      console.log('[ws] error', peer, error)
    },
  }),
)

// In the background, increment a number every second and notify subscribers when it changes.
function incrementNumber() {
  currentNumber++
  pubsub
    .publish('NUMBER_INCREMENTED', { numberIncremented: currentNumber })
    .catch(console.error)
  setTimeout(incrementNumber, 1000)
}

// Start incrementing
incrementNumber()
