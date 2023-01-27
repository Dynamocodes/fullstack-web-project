import { createSlice } from "@reduxjs/toolkit";

const initialState = 0;

const currentWordSlice = createSlice({
  name: 'currentWord',
  initialState,
  reducers:{
    setCurrentWord(_state, action){
      return action.payload
    },
    nextWord(state, _action){
      return state + 1
    },
    previousWord(state, _action){
      return state - 1
    },
    resetCurrentWord(state, action){
      return initialState
    }
  }
})

export const { setCurrentWord, nextWord, previousWord, resetCurrentWord } = currentWordSlice.actions
export default currentWordSlice.reducer