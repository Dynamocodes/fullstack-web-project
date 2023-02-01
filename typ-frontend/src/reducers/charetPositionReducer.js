import { createSlice } from "@reduxjs/toolkit";

const initialState = {oldY:0, positionY:0}

const charetPositionSlice = createSlice({
    name: 'charetPostion',
    initialState,
    reducers:{
        updateCharetPosition(state, action){
            return {oldY: state.positionY, positionY: action.payload}
        },
        resetCharetPosition(state, action){
            return initialState
        }
    }
})

export const {updateCharetPosition, resetCharetPosition} = charetPositionSlice.actions
export default charetPositionSlice.reducer

