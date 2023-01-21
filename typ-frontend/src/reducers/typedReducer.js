import { createSlice } from "@reduxjs/toolkit";

const initialState = ''

const typedSlice = createSlice({
    name: 'typed',
    initialState,
    reducers:{
        setTyped(state, action){
            return action.payload
        }
    }
})

export const {setTyped} = typedSlice.actions
export default typedSlice.reducer