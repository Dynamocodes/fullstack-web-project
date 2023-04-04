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
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      const auth = req ? req.headers.authorization : null
      if (auth && auth.toLowerCase().startsWith('bearer ')) {
        const decodedToken = jwt.verify(
          auth.substring(7), JWT_SECRET
        )
        const currentUser = await User.findById(decodedToken.id)
        return { currentUser }
      }
    }
  })
  
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

if(process.env.NODE_ENV === 'test'){
  const testingRouter = require('./controllers/tests')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.errorHandler)

module.exports = app