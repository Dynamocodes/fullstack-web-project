import { createSlice } from "@reduxjs/toolkit";

const initialState = []

const lastStrokeSlice = createSlice({
    name: 'lastStroke',
    initialState,
    reducers:{
        setLastStroke(state, action){
            const newState = [...state]
            if(state.length === 5){   
                newState.pop()
            }
            newState.unshift(action.payload)
            return newState
        },
        updateLastStroke(state, action){
            if(state.length < 5){
                const newState = [...state]
                newState[0] = action.payload
                return newState
            }
            const newState = [...state]
            newState[0] = action.payload
            return newState
        },
        resetLastStroke(state, action){
            return initialState
        }
    }
})

export const {setLastStroke, updateLastStroke, resetLastStroke} = lastStrokeSlice.actions
export default lastStrokeSlice.reducer