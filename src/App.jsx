import React from 'react'
import { Routes } from 'react-router-dom'
import{Login,Register,Brand ,Categories,
  Dashboard, Firms , Products,Profile,Purchases ,Sales}from "./pages"
import { Route } from 'react-router-dom'
import PrivateRoutes from './PrivateRoutes'
import Layout from "./components/Layout"
export default function App() {
  return (
  <Routes>
       <Route path='/' element={<Login/>}/>
       <Route path='/register' element={<Register/>}/>
               {/* i can use path="" than i dont need to provide / before each page ,it take it automaticly*/}
    <Route path="/stock" element={<PrivateRoutes/>}>   {/* if path="" */} 
             {/*  protected  pages*/}
             {/* i wrape all the pages with layout ,so i have in there always header and sidebar */}
             <Route path='/stock' element={<Layout/>}>   {/* it working also with path="" */}
       <Route path='brand' element={<Brand/>}/>
       <Route path='categories' element={<Categories/>}/>  {/*  than path="/brand" */}
       <Route path='dashboard' element={<Dashboard/>}/>
       <Route path='firms' element={<Firms/>}/>
       <Route path='products' element={<Products/>}/>
       <Route path='profile' element={<Profile/>}/>
       <Route path='purchases' element={<Purchases/>}/>
       <Route path='sales' element={<Sales/>}/>
            </Route>
      </Route>
   </Routes>
  )
}
