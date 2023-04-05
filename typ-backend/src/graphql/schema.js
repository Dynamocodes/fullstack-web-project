const { UserInputError } = require('apollo-server-express');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../utils/config')
const User = require("../models/User");
const Statistic = require("../models/Statistic");


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

  allStatistics(username: String!): [Statistic]!
}

type Mutation {
  createUser(
    username: String!,
    password: String!
  ): User
  login(
    username: String!
    password: String!
  ): Token
}
`;
const resolvers = {
  Query: {
    allStatistics: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      const stats = await Statistic.find({ user: user._id });
      return stats;
    },

    me: (root, args, context) => {
      return context.currentUser;
    },
  },

  Statistic: {
    date: (root) => root.date,
    id: (root) => root.id,
    grossWpm: (root) => root.grossWpm,
    netWpm: (root) => root.netWpm,
    accuracy: (root) => root.accuracy,
    time: (root) => root.time,
    right: (root) => root.right,
    wrong: (root) => root.wrong,
    extra: (root) => root.extra,
    missing: (root) => root.missing,
  },

  User: {
    username: (root) => root.username,
    id: (root) => root.id,
  },

  Mutation: {
    createUser: async (root, args) => {
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(args.password, saltRounds);

      const user = new User({
        username: args.username,
        passwordHash,
      });

      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      });
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user) {
        throw new UserInputError("Invalid username or password");
      }

      const passwordMatch = await bcrypt.compare(
        args.password,
        user.passwordHash
      );

      if (!passwordMatch) {
        throw new UserInputError("Invalid username or password");
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
  },
};


const schema = {typeDefs, resolvers}
module.exports = schema

