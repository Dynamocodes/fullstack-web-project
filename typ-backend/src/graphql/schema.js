const { UserInputError } = require('apollo-server-express');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../utils/config')
const User = require("../models/User");
const Statistic = require("../models/Statistic");
const uuid = require('uuid');
const { Types } = require('mongoose');


const typeDefs = `
type Statistic {
  date: String!
  grossWpm: Float!
  netWpm: Float!
  accuracy: Float!
  time: Int!
  right: Int!
  wrong: Int!
  extra: Int!
  missing: Int!
  id: ID!
  user: ID!
}

input StatisticInput {
  date: String!
  grossWpm: Float!
  netWpm: Float!
  accuracy: Float!
  time: Int!
  right: Int!
  wrong: Int!
  extra: Int!
  missing: Int!
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

  allStatistics(userId: ID!): [Statistic]!
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

  addStatistic(
    user: ID!
    statisticInput: StatisticInput!
    ): Statistic!
}
`;
const resolvers = {
  Query: {
    allStatistics: async (root, { userId }) => {
      const user = await User.findById(userId).populate('statistics');
      return user.statistics;
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
    user: (root) => root.user,

  },

  User: {
    username: (root) => root.username,
    id: (root) => root.id,
  },

  Mutation: {
    addStatistic: async (parent, { user, statisticInput }, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("You must be logged in to add a statistic");
      }
    
      const userToUpdate = await User.findById(Types.ObjectId(user));
    
      if (!userToUpdate) {
        throw new UserInputError("Invalid user ID");
      }
    
      const newStatistic = new Statistic({
        ...statisticInput,
        user: userToUpdate._id,
        id: uuid.v1(),
      });
    
      userToUpdate.statistics.push(newStatistic.id);
    
      try {
        await userToUpdate.save();
        await newStatistic.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: statisticInput
        });
      }
    
      return newStatistic;
    },
    

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

