import { createSlice } from "@reduxjs/toolkit";

const initial = {currentYearLeads: []};

const homeSlice = createSlice({
    name: "home",
    initialState:  initial,
    reducers: {
        currentYearLeads (state, action) {
            state.currentYearLeads = action.payload.currentYearLeads
        }
    }
});


export const homeActions = homeSlice.actions;

export default homeSlice;