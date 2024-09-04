import { createSlice } from "@reduxjs/toolkit";

 const initialState={           
       currentUser: sessionStorage.getItem("username") || null, /* at first it is null (no user)  after register i have value than i take it from the browser where i store it in sessionStorage*/
       token: sessionStorage.getItem("token") || null, /*  store the value as string will be in the sessionStorage like localstorage */
       firstName: sessionStorage.getItem("firstName") || null,/* i write this like in api is gewritten */
       lastName: sessionStorage.getItem("lastName") || null,
       email: sessionStorage.getItem("email") || null,
       isAdmin :sessionStorage.getItem("isAdmin") || null,
       id:sessionStorage.getItem("id") || null,
}


const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
          auth(state,action){         /* from postman can i check what i have in the respons than i take what i want to show in my app ,to update my state */
            state.token =action.payload.token  ;/* when i make login or register */
            state.currentUser=action.payload?.user?.username|| action.payload?.data?.username
            state.firstName=action.payload.user.firstName||action.payload?.data?.firstName;
            state.lastName=action.payload.user.lastName;
            state.email=action.payload.user.email;
            state.isAdmin=action.payload.user.isAdmin;
            state.id=action.payload.user._id;


          }
    }
})

/* to make login like */


export const authReducer=authSlice.reducer