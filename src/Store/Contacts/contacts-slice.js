import { createSlice } from "@reduxjs/toolkit";

let initial = { filterColumns:[], columns:[], contacts:[], canEdit: null, canCreate: null , filterApplied: false, notes:[] };

const contactsSlice = createSlice({
    name:"contacts",
    initialState: initial,
    reducers : {

    }
});

export const contactsActions = contactsSlice.actions;

export default contactsSlice