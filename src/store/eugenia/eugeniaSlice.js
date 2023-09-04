import { createSlice } from "@reduxjs/toolkit";
//import { addHours } from "date-fns";




export const eugeniaSlice = createSlice({
    name: 'invitation',
    initialState: {
        invitations: [
            
        ],
        activeInvite: null
        
    },
    reducers: {
        onSetActiveInvite: (state, { payload }) => {
            state.activeInvite = payload;
            
        },

        onAddNewInvite: (state, { payload }) => {
            state.invitations.push( payload );
            state.activeInvite = null;
        },
        onUpdateInvite: (state, {payload}) => {
            state.invitations = state.invitations.map( event => {
                if (event._id === payload._id) {
                    return payload;
                }
                return event;
            });

        },
        onDeleteInvite: ( state, {payload}  ) => {
                state.invitations = state.invitations.filter( invite => invite.id !== payload.id);
                state.activeInvite = null;

        },

        onLoadInvite: (state, {payload}) => {
            state.invitations = payload


        }
    }
});

export const { onSetActiveInvite, onAddNewInvite, onUpdateInvite , onDeleteInvite, onLoadInvite } = eugeniaSlice.actions;