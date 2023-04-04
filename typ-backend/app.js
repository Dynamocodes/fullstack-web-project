const config = require('./src/utils/config')
const logger = require('./src/utils/logger')
const express = require('express')
require('express-async-errors')
const app = express()
const wordRouter = require('./src/routes/words')
const cors = require('cors')
const middleware = require('./src/utils/middleware')
const mongoose = require('mongoose')
const { ApolloServer, gql } = require('apollo-server-express');
const {typeDefs, resolvers} = require('./src/graphql/schema')

logger.info('connecting to', config.MONGODB_URI)

async function startApolloServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });
}

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
    startApolloServer();
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/words', wordRouter)
//app.use('/api/users', usersRouter)
//app.use('/api/login', loginRouter)

if(process.env.NODE_ENV === 'test'){
  const testingRouter = require('./controllers/tests')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.errorHandler)

module.exports = app