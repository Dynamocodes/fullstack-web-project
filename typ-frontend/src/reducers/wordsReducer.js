import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const wordSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {
    setWords(_state, action){
      return action.payload
    },
    addWords(state, action){
      return state.concat(action.payload)
    }
  }
})

export const { setWords, addWords } = wordSlice.actions

export const initializeWords = () => {
  return async dispatch => {
    const words = ['this', 'is', 'a', 'typing', 'test', 'and', 'this', 'is', 'the', 'first', 'iteration'];
    dispatch(setWords(words))
  }
}


export default wordSlice.reducer

