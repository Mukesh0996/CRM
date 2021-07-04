import { createSlice } from "@reduxjs/toolkit";

const initialState = { fields:{} };

const leadSlice = createSlice({
    name:"leadSlice",
    initialState: initialState,
    reducers : {
        addFields(state, action) {
            state.fields = action.payload.fields
        },
    }
});

export const leadsActions = leadSlice.actions;

export default leadSlice;