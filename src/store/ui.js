import { createSlice } from "@reduxjs/toolkit";

const uiSlice=createSlice({
    name:"ui",
    initialState: {
        sidebarOpen: false,  /* our state ,it closed */
    },
    reducers:{    /* here all the action what we need */
        toggleMenu(state){    /* here i dont need payload (to update with new value,here just toggle) */
              state.sidebarOpen= !state.sidebarOpen;
        }
    }
})
const uiReducer=uiSlice.reducer;
const uiActions=uiSlice.actions;
export { uiActions, uiReducer };
