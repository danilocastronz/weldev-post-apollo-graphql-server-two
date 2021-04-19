import { ApolloServer } from 'apollo-server';

// import schema definition
import schema from './graphql/schema';

// define the Apollo Server instance
const server = new ApolloServer({ schema });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`GraphQL server running at ${url}`);
});
