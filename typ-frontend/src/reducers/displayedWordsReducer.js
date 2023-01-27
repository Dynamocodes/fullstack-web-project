import { createSlice } from "@reduxjs/toolkit";

const initialState = []

const displayedWordSlice = createSlice({
  name: 'displayedWords',
  initialState,
  reducers: {
    setDisplayedWords(state, action){
      return action.payload
    },
    setDisplayedWordAt(state, action){
      const {index, word} = action.payload
      const displayed = [...state]
      displayed[index] = word
      return displayed
    },
    resetDisplayedWords(state, action){
      return initialState
    }
  }
})

export const {setDisplayedWords, setDisplayedWordAt, resetDisplayedWords} = displayedWordSlice.actions
export default displayedWordSlice.reducer

export const changeDisplayedWordAt = (index, word) => {
  return dispatch => {
    dispatch(setDisplayedWordAt({index, word}))
  }
}

export const initializeDisplayedWords = (word) => {
  return dispatch => {
    dispatch(setDisplayedWords(word))
  }
}