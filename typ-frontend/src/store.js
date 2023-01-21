import { configureStore } from "@reduxjs/toolkit";
import wordsReducer from "./reducers/wordsReducer";
import currentWordReducer from "./reducers/currentWordReducer";
import copiedReducer from "./reducers/copiedWordsReducer";
import typedReducer from "./reducers/typedReducer";


const store = configureStore({
    reducer: {
      words: wordsReducer,
      currentWord: currentWordReducer,
      copied: copiedReducer,
      typed: typedReducer,
    }
  })
  
  export default store