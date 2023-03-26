import { createSlice } from "@reduxjs/toolkit";
import wordServices from '../services/wordServices'

const initialState = []

const wordPoolSlice = createSlice({
    name: 'wordPool',
    initialState,
    reducers:{
        setWordPool(state, action){
            return action.payload
        }
    }
})

export const { setWordPool } = wordPoolSlice.actions

export const initializeWordPool = () => {
  return async dispatch => {
    const words = await wordServices.getWordPool()
    dispatch(setWordPool(words))
  }
}


export default wordPoolSlice.reducer
