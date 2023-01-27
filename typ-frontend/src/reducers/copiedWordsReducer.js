import { createSlice } from "@reduxjs/toolkit";

const initialState = []

const copiedSlice = createSlice({
  name: 'copied',
  initialState,
  reducers: {
    setCopied(state, action){
      return action.payload
    },
    addCopiedWord(state, action){
      return state.concat(action.payload)
    },
    removeLastCopiedWord(state, action){
      const copiedWords = [...state]
      copiedWords.pop()
      return copiedWords
    },
    resetCopied(state, action){
      return initialState
    }
  }
})

export const {setCopied, addCopiedWord, removeLastCopiedWord, resetCopied} = copiedSlice.actions
export default copiedSlice.reducer