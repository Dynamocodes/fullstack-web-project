const  wordData = require('../data/words-en.json')

const getWords = () => {
    return wordData.words;
}

const wordServices = {getWords}
module.exports =  wordServices