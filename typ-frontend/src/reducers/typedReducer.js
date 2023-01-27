import { createSlice } from "@reduxjs/toolkit";

const initialState = {old:'', new:''}

const typedSlice = createSlice({
    name: 'typed',
    initialState,
    reducers:{
        setTyped(state, action){
            return {old: state.new, new:action.payload}
        },
        resetTyped(state, action){
            return initialState
        },
    }
})

export const {setTyped, resetTyped} = typedSlice.actions
export default typedSlice.reducer