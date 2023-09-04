import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
         status: 'not-authenticated',
         user: {},
         errorMessage: undefined,
         code: null
    },

    reducers: {
        onChecking: ( state ) => {
            state.status = 'checking';
            state.user = {};
            state.errorMessage = undefined
        },

        onLoging: (state, { payload } ) => {
            state.status = 'authenticated';
            state.user = payload;
            state.errorMessage = undefined;
            
        },

        onLogout: (state, { payload }) => {
            state.status = 'not-authenticated';
            state.user = {};
            state.errorMessage = payload

        },

        clearErrorMessage: ( state ) => {
            state.errorMessage = undefined;
        },

        onRecoveryAccount: ( state, { payload } ) => {
            state.code = payload
        },

        onGetCodeById: (state, { payload }) => {
            state.code = payload;
        }
       
    }

});

export const { onChecking, onLoging, onLogout, clearErrorMessage, onRecoveryAccount, onGetCodeById, onRecovery } = authSlice.actions;