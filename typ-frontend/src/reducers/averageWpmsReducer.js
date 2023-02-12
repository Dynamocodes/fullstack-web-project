import { createSlice } from "@reduxjs/toolkit";

const initialState = []

const averageWpmsSlice = createSlice({
  name: 'averageWpms',
  initialState,
  reducers: {
    addAverageWpms(state, action){
      return state.concat(action.payload)
    },
    resetAverageWpms(state, action){
      return initialState
    }
  }
})

export const { addAverageWpms, resetAverageWpms} = averageWpmsSlice.actions
export default averageWpmsSlice.reducer