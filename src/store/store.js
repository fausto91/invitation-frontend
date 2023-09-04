import { configureStore } from "@reduxjs/toolkit";
import { authSlice, eugeniaSlice } from "./";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        invitation: eugeniaSlice.reducer

    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
}) 