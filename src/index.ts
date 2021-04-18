const { ApolloServer } = require('apollo-server');

// import schema definition
const schema = require('./graphql/schema.ts');

// define the Apollo Server instance
const server = new ApolloServer({ schema });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`GraphQL server running at ${url}`);
});
