import { configureStore } from "@reduxjs/toolkit";
import leadActions from './Leads/leads-slice';

const store = configureStore({
    reducer: {
        leads: leadActions.reducer
    }
});

export default store;