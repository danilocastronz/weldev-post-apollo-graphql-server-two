import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

import { gql, makeExecutableSchema } from 'apollo-server';

const typeDefs = gql`
  # This "Company" type defines the queryable fields for every company in our data source.
  type Company {
    id: Int!
    name: String!
    description: String
    branches: [Branch]
  }

  # This "Branch" type defines the queryable fields for every branch in our data source.
  type Branch {
    id: Int!
    title: String!
    city: String
    country: String
    company: Company!
    employees: [Employee]
  }

  # This "Employee" type defines the queryable fields for every employee in our data source.
  type Employee {
    id: Int!
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
    company(id: Int!): Company
  }
`;

const resolvers = {
  Query: {
    companies: () => prisma.company.findMany({ include: { branches: true } }),
    branches: () => prisma.branch.findMany(),
    employees: () => prisma.employee.findMany(),
    company: (_parent: any, args: any) =>
      prisma.company.findUnique({
        where: { id: args.id },
      }),
  },
};

const schemaDef = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schemaDef;
