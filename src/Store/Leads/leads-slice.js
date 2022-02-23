import { createSlice } from "@reduxjs/toolkit";

let initial = { filterColumns:[], columns:[], leads:[], filteredLeads:[], canEdit: null, canCreate: null , filterApplied: false, notes:[{content:"hello", orgId: 100},{content:"hello", orgId: 100}]}

const leadSlice = createSlice({
    name:"leads",
    initialState: initial,
    reducers: {
        replaceLeads (state, action) {
            state.leads = action.payload.leads;
            state.canCreate = action.payload.canCreate;
            state.canEdit = action.payload.canEdit;
            state.columns = action.payload.cols;
        }, addLead (state, action) {
            const lead = action.payload;
            state.leads.push(lead);
        }, addFilteredLeads (state, action) {
            state.filterApplied = true
            state.filteredLeads = action.payload.filteredLeads
        }, addFilterColumns (state, action) {
            state.filterColumns = action.payload.filterColumns
        }, addNote (state, action) {
            console.log("actions is", action);
            state.notes.push(action.payload)
        }
    }
});
export const leadActions = leadSlice.actions;

export default leadSlice;