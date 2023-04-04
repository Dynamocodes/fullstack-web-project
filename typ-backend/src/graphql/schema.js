const typeDefs = `
type Statistic {
  date: String!
  grossWpm: Int!
  netWpm: Int!
  accuracy: Int!
  time: Int!
  right: Int!
  wrong: Int!
  extra: Int!
  missing: Int!
  id: ID!
}

type User {
  username: String!
  id: ID!
}

type Token {
  value: String!
}

type Query {
  me: User
}
type Mutation {
  createUser(
    username: String!
  ): User
  login(
    username: String!
    password: String!
  ): Token
}
`;
const resolvers = {  }; 

const schema = {typeDefs, resolvers}
module.exports = schema

