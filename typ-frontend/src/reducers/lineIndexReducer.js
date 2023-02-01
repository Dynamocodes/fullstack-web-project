import { createSlice } from "@reduxjs/toolkit";

const initialState = [0]

const lineIndexSlice = createSlice({
    name: 'lineIndex',
    initialState,
    reducers:{
        addLineIndex(state, action){
            return state.concat(action.payload)
        },
        removeLineIndex(state, action){
            const lines = [...state]
            lines.pop()
            return lines
        },
        resetLineIndex(state, action){
            return initialState
        }
    }
})

export const {addLineIndex, removeLineIndex, resetLineIndex} = lineIndexSlice.actions
export default lineIndexSlice.reducer

