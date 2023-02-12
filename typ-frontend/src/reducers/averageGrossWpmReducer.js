import { createSlice } from "@reduxjs/toolkit";

const initialState = 0

const averageGrossWpmSlice = createSlice({
    name: 'averageGrossWpm',
    initialState,
    reducers: {
        setAverageGrossWpm(state, action){
            return action.payload
        },
        resetAverageGrossWpm(state, action){
            return initialState
        }
    }
})

export const { setAverageGrossWpm, resetAverageGrossWpm} = averageGrossWpmSlice.actions
export default averageGrossWpmSlice.reducer
