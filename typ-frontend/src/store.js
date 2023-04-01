import { configureStore } from "@reduxjs/toolkit";
import wordsReducer from "./reducers/wordsReducer";
import currentWordReducer from "./reducers/currentWordReducer";
import copiedReducer from "./reducers/copiedWordsReducer";
import typedReducer from "./reducers/typedReducer";
import displayedWordsReducer from "./reducers/displayedWordsReducer";
import lastStrokeReducer from "./reducers/lastStrokeReducer";
import wpmReducer from './reducers/wpmReducer'
import charetPositionReducer from "./reducers/charetPositionReducer";
import lineIndexReducer from "./reducers/lineIndexReducer";
import instantWpmsReducer from "./reducers/instantWpmsReducer";
import averageWpmsReducer from "./reducers/averageWpmsReducer";
import averageGrossWpmReducer from "./reducers/averageGrossWpmReducer";
import wordPoolReducer from "./reducers/wordPoolReducer";
import selectedTimeReducer from "./reducers/selectedTimeReducer";

const store = configureStore({
    reducer: {
      words: wordsReducer,
      currentWord: currentWordReducer,
      copied: copiedReducer,
      typed: typedReducer,
      displayedWords: displayedWordsReducer,
      lastStroke: lastStrokeReducer,
      wpm: wpmReducer,
      charetPosition: charetPositionReducer,
      lineIndex: lineIndexReducer,
      instantWpms: instantWpmsReducer,
      averageWpms: averageWpmsReducer,
      averageGrossWpm: averageGrossWpmReducer,
      wordPool: wordPoolReducer,
      selectedTime: selectedTimeReducer,
    }
  })
  
  export default store