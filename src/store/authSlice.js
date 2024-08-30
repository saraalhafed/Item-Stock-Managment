import { createSlice } from "@reduxjs/toolkit";

 const initialState={           
       currentUser: sessionStorage.getItem("username") || null, /* at first it is null (no user)  after register i have value than i take it from the browser where i store it in sessionStorage*/
       token: sessionStorage.getItem("token") || null, /* the value as string will be in the sessionStorage like localstorage */
       firstName: sessionStorage.getItem("firstName") || null,/* i write this like in api is gewritten */
       lastName: sessionStorage.getItem("lastName") || null,
       email: sessionStorage.getItem("email") || null,
       isAdmen :sessionStorage.getItem("isAdmen") || null,
       id:sessionStorage.getItem("id") || null,
}


const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
          auth(state,action){         /* from postman can i checl what i have in the respons than i take what i want to show in my app ,to update my state */
                 state.token =action.payload.token  /* when i make login or register */
            state.currentUser=action.payload.user.username
                  



          }
    }
})

export const authReducer=authSlice.reducer