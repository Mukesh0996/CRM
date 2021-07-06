import { createSlice } from "@reduxjs/toolkit";

let initial = { colums:{}, leads:[], canEdit: null, canCreate: null }

const leadSlice = createSlice({
    name:"leads",
    initialState: initial,
    reducers: {
        replaceLeads (state, action) {
            state.leads = action.payload.leads;
            state.canCreate = action.payload.canCreate;
            state.canEdit = action.payload.canEdit;
        }, addLead (state, action) {
            const lead = action.payload;
            state.leads.push(lead);
        }, addColumns (state, action) {
            state.columns = action.payload.columns
        }
    }
});

export const leadActions = leadSlice.actions;

export default leadSlice;