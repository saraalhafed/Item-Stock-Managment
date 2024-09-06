import { configureStore } from "@reduxjs/toolkit";
import { uiReducer } from "./ui";
import { categoriesReducer } from "./categories";
import { authReducer } from "./authSlice";
  export const store=configureStore({
    reducer:{
         auth:authReducer,
         ui:uiReducer,
         categories: categoriesReducer,
   

    }
 })
