import { configureStore } from "@reduxjs/toolkit";
import leadSlice from './Leads/leads-slice';
import contactsSlice from "./Contacts/contacts-slice";
import homeSlice from "./Home/home-slice";

const store = configureStore({
    reducer: {
        leads: leadSlice.reducer,
        contacts: contactsSlice.reducer,
        home: homeSlice.reducer
    }
});

export default store;