import { createSlice } from "@reduxjs/toolkit";

let initial = { filterColumns:[], contacts:[], canEdit: null, canCreate: null , filterApplied: false };

const contactsSlice = createSlice({
    name:"contacts",
    initialState: initial,
    reducers : {

    }
});

export const contactsActions = contactsSlice.actions;

export default contactsSlice