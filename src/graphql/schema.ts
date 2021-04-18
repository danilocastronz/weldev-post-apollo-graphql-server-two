const { gql, makeExecutableSchema } = require('apollo-server');

// import mocked data
const companies = require('../data/company.ts');
const branches = require('../data/branch.ts');
const employees = require('../data/employee.ts');

const typeDefs = gql`
  # This "Company" type defines the queryable fields for every company in our data source.
  type Company {
    id: ID!
    name: String!
    description: String
    branches: [Branch]
  }

  # This "Branch" type defines the queryable fields for every branch in our data source.
  type Branch {
    id: ID!
    title: String!
    city: String
    country: String
    company: Company!
    employees: [Employee]
  }

  # This "Employee" type defines the queryable fields for every employee in our data source.
  type Employee {
    id: ID!
    firstName: String!
    lastName: String!
    role: String
    branch: Branch!
    company: Company!
  }

  type Query {
    companies: [Company]
    branches: [Branch]
    employees: [Employee]
  }
`;

const resolvers = {
  Query: {
    companies: () => companies,
    branches: () => branches,
    employees: () => employees,
  },
};

const schemaDef = makeExecutableSchema({
  typeDefs,
  resolvers,
});

module.exports = schemaDef;
