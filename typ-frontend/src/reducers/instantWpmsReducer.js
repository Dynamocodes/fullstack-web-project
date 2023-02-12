import { createSlice } from "@reduxjs/toolkit";

const initialState = []

const instantWpmSlice = createSlice({
    name: 'instantWpms',
    initialState,
    reducers:{
        addWpm(state, action){
            return state.concat(action.payload)
        },
        resetInstantWpms(state, action){
            return initialState
        }
    }
})

export const {addWpm, resetInstantWpms} = instantWpmSlice.actions
export default instantWpmSlice.reducer

