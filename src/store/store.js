import { configureStore } from "@reduxjs/toolkit";
import { uiReducer } from "./ui";
import { categoriesReducer } from "./categories";
import { authReducer } from "./authSlice";
import {productsReducer }from "./products"
import { salesReducer } from "./sales";
import { purchasesReducer } from "./purchases";
import { firmsReducer } from "./firms";
import { brandsReducer } from "./brands";
  export const store=configureStore({
    reducer:{
         auth:authReducer,
         ui:uiReducer,
         categories: categoriesReducer,
         products: productsReducer,
         sales: salesReducer,
         purchases:purchasesReducer,
         firms:firmsReducer,
         brands:brandsReducer,
 
    }
 })
