import { configureStore } from "@reduxjs/toolkit";
import leadSlice from "./Leads/leads-slice";


const store = configureStore({
    reducer: {
        lead: leadSlice.reducer
    }
});

export default store;