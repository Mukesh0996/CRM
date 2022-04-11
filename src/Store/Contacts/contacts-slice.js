import { createSlice } from "@reduxjs/toolkit";

let initial = { filterColumns:[], columns:[], contacts:[], canEdit: null, canCreate: null , filterApplied: false, notes:[] };

const contactsSlice = createSlice({
    name:"contacts",
    initialState: initial,
    reducers : {
        addFilterColumns(state, action) {
            console.log("payload is", action.payload);
            state.filterApplied = true;
            state.filterColumns = action.payload.filterColumns;
        },
        replaceContacts (state, action) {
            state.contacts = action.payload.contacts;
            state.canCreate = action.payload.canCreate;
            state.canEdit = action.payload.canEdit;
            state.columns = action.payload.cols;
        }

    }
});

export const contactsActions = contactsSlice.actions;

export default contactsSlice