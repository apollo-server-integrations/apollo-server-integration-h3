import { createApp } from 'h3'
import { ApolloServer } from '@apollo/server'
import { startServerAndCreateH3Handler } from '../src'

const typeDefs = `#graphql
  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
  }
`

// Resolvers define how to fetch the types defined in your schema.
// This resolver returns simply a static list of books
const resolvers = {
  Query: {
    books: () => [
      {
        title: 'The Awakening',
        author: 'Kate Chopin',
      },
      {
        title: 'City of Glass',
        author: 'Paul Auster',
      },
    ],
  },
}

const apollo = new ApolloServer({
  typeDefs,
  resolvers,
})

export const app = createApp()
app.use('.', startServerAndCreateH3Handler(apollo, {}))
