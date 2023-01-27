import { configureStore } from "@reduxjs/toolkit";
import wordsReducer from "./reducers/wordsReducer";
import currentWordReducer from "./reducers/currentWordReducer";
import copiedReducer from "./reducers/copiedWordsReducer";
import typedReducer from "./reducers/typedReducer";
import displayedWordsReducer from "./reducers/displayedWordsReducer";
import lastStrokeReducer from "./reducers/lastStrokeReducer";
import wpmReducer from './reducers/wpmReducer'


const store = configureStore({
    reducer: {
      words: wordsReducer,
      currentWord: currentWordReducer,
      copied: copiedReducer,
      typed: typedReducer,
      displayedWords: displayedWordsReducer,
      lastStroke: lastStrokeReducer,
      wpm: wpmReducer,
    }
  })
  
  export default store