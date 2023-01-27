import { createSlice } from "@reduxjs/toolkit";

const initialState = 0

const wpmSlice =  createSlice({
    name: 'wpm',
    initialState,
    reducers:{
        setWpm(state, action){
            return action.payload
        },
        resetWpm(state, action){
            return initialState
        }
    }
})

export const {setWpm, resetWpm} = wpmSlice.actions
export default wpmSlice.reducer