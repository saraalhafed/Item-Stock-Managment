import React from 'react'
import { Routes } from 'react-router-dom'
import{Login,Register,Brand ,Categories,
  Dashboard, Firms , Products,Profile,Purchases ,Sales}from "./pages"
import { Route } from 'react-router-dom'
import PrivateRoutes from './PrivateRoutes'
export default function App() {
  return (
  <Routes>
       <Route path='/' element={<Login/>}/>
       <Route path='/register' element={<Register/>}/>
               {/* i can use path="" than i dont need to provide / before each page ,it take it automaticly*/}
    <Route path="/stock" element={<PrivateRoutes/>}>   {/* if path="" */} 
             {/*  protected  pages*/}
       <Route path='brand' element={<Brand/>}/>
       <Route path='categories' element={<Categories/>}/>  {/*  than path="/brand" */}
       <Route path='dashboard' element={<Dashboard/>}/>
       <Route path='firms' element={<Firms/>}/>
       <Route path='products' element={<Products/>}/>
       <Route path='profile' element={<Profile/>}/>
       <Route path='purchases' element={<Purchases/>}/>
       <Route path='sales' element={<Sales/>}/>
       
      </Route>
   </Routes>
  )
}
