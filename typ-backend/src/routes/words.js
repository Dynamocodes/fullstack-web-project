
const wordsRouter = require('express').Router()
const wordService = require('../services/wordService')


wordsRouter.get('/', (_req, res) => {
  const words = wordService.getWords()
  res.send(words);
});

module.exports = wordsRouter;