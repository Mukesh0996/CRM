import { createSlice } from "@reduxjs/toolkit";

let initial = { fields:{}, leads:{}, canEdit: null, canCreate: null }

const leadSlice = createSlice({
    name:"leads",
    initialState: initial,
    reducers: {
        replaceLeads (state, action) {
            state.leads = action.payload.leads;
            state.canCreate = action.payload.canCreate;
            state.canEdit = action.payload.canEdit;
        },
        addFields (state, action) {
            state.fields = action.payload.fields;
        }
    }
});

export const leadActions = leadSlice.actions;

export default leadSlice;