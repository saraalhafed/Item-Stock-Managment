import React from 'react'
import Header from './Header'
import  Sidebar  from './Sidebar'
import { Toolbar,Box } from '@mui/material'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <Box sx={{display:"flex"}}>
        <Header/>
         <Sidebar/>
         <Box component="main"
               sx={{flexGrow:1,height:"100vh",width:"100%",overflow:"auto"}}>
        
           <Toolbar/>
           <Outlet/>

         </Box>
    </Box>
  )
}
export default Layout;

 {/* This is the part we want to display our content */}
        {/* way-1 to use children props and each time wrap your components,here we need children as a props also */}
        {/* in this way we need to add this layout in every page , provide the <Layout/> component inside all the component pages */}
        {/* {children} */}

        {/* way-2 is to use Routes ,add one route with a path and layout component in app.jsx, so we wrape alle pages just one line , here use outlet instead of  childern*/}