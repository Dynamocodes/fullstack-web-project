import { createSlice } from "@reduxjs/toolkit";

const initialState = 60

const selectedTimeSlice = createSlice({
    name: 'selectedTime',
    initialState,
    reducers: {
        setSelectedTime(state, action){
            return action.payload
        }
    }
})

export const { setSelectedTime } = selectedTimeSlice.actions
export default selectedTimeSlice.reducer