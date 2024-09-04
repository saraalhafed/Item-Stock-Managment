import { AppBar, Avatar, IconButton, Toolbar,  styled,Typography ,Box, MenuItem,Menu, Divider,Stack} from '@mui/material';
import React from 'react'
import config from '../../config/config';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {toggleMenu, uiActions} from "../../store/ui"
import MenuIcon from '@mui/icons-material/Menu';
import PasswordIcon from '@mui/icons-material/Password';
import LogoutIcon from '@mui/icons-material/Logout';


/* we need Appbar but with spesific style so we need to customize the Appbar(give our styles) */
// customize AppBar
//? styled(AppBar)(({ theme, open }) => ({ ... }))`:
//* This line creates a styled version of the AppBar component. The styling is based on a function that receives the theme object and the open prop.
//* theme provides access to the Material-UI theme object, which includes values like colors, spacing, zIndex, and transition settings.
//* open is a boolean prop that indicates whether the drawer (sidebar) is open or not.

const drawerWidth = config.drawerWidth; /* give a specific width for drower */
/* customize AppBar is fuc wich has obj }*/
/* what inside this func is just css properyties */
const MyAppBar= styled(AppBar)(({theme,open})=>({
    /* to be sure that AppBar at the top i create new zIndex for AppBar */
    zIndex:theme.zIndex.drawer+1,
    transitions:theme.transitions.create("width",
         { easing: theme.transitions.sharp,
            duration: theme.transitions.enteringScreen
         }
    ),
    /* i make copye for the first style AppBarr and here update just width and duration acording to open value  */
    ...(open &&
        {width:`calc(100% - ${drawerWidth}px)`,   /* here we clculate ,if sidebar open the width will be smale */
        transitions:theme.transitions.create("width",
            { easing: theme.transitions.sharp,
               duration: theme.transitions.leavingScreen
            })
    } )
          /* when we distructuring we update more than one value  */
}))
/* open={true} the appbar to right shrink it,width is change according to the open value */
/* open={false}  */

 const Header = () => {
   const {sidbarOpen }= useSelector((state)=>state.ui)  /* for sideBar menu */
   const dispatch =useDispatch() /* to fire the action togglelMenu for sideBar */

   const [anchorEl,setAnchorEl]=useState(null);/* for open the avatar menu */

   const currentUser=sessionStorage.getItem("username") /* i get it from the storage to use it in Avatar img,i can get it from auth api  with useSelector */
  
   const navigate = useNavigate();

   return (
   <MyAppBar open={sidbarOpen}> {/* we use state in open property ,if open  true   sidebar is opend and Appbar shrinkt */}
     {/* --menuIcon for sidbar-- */}
      <Toolbar>
         <IconButton
         color='inherit'
         size="large"
         edge="start"
         sx={{mr:2}}
         onClick={()=>dispatch(uiActions.toggleMenu())}> {/* we need action from uireducer to open the sidebar */}
            <MenuIcon/>
         </IconButton>
      
  {/* ---title-- */}
  <Typography component="h1" variant='h5' nowrap sx={{flexGrow:1}}>
  Clarusway Item Stock
  </Typography>
{/* ---avatarIcon- */}
       <Box    /* we can wrap the avatar with iconButton also instead of Box */
       sx={{cursor:"pointer"}}   /* for the syntax sx ,:"text" ,:number */
       onClick={(e)=>setAnchorEl(e.currentTarget)}> {/* action to open the avatarmenu */ }
          <Avatar src="broken-image" alt={currentUser.toUpperCase()}/>{/*from avatar component in mui: broken-image  will take the first letter from alt and put it in img ,*/}
       </Box>
 {/* --avatar Menu-- */}
         <Menu 
         anchorEl={anchorEl}
         open={Boolean(anchorEl)}     /* take the value of anchorEl and open the menu */
         onClose={() => setAnchorEl(null)}  /* make anchorEl null and close the menu */
         anchorOrigin={{            /* from mui menu -popover component : anchorOrigin, transformOrigin*/
            vertical: 'bottom',    /* for position  of  content inside the  menu */
            horizontal: 'left',
          }}  
          transformOrigin={{ /* for the positon of menu it selfe according to the screen */
            vertical: 'top',
            horizontal: 'right',
          }}                   
        >
              <MenuItem>
              <Stack 
              direction="row"
              justifyContent="space-between"
              alignItem="center">
               <Avatar src="broken" alt={currentUser.toUpperCase()} variant='squar'/>
                <Stack   direction="column" textAlign="center">
                           <Typography  ml="50px"
                                      variant="h6"
                                           sx={{
                                              textTransform: 'capitalize'}}>
                           {currentUser}
                           </Typography>
                           <Typography  ml="50px"
                                    variant="subtitle2"
                                       sx={{  color: 'gray'}}>
                               {sessionStorage.getItem("isAdmin") === "true"    /* ineed to check if it is string(i put true in "") ,in sessionStorage when  the value is (true) that is mean string not boolean value,in this store just string value */
                                ? "Admin"
                                 : "User"}

                           </Typography>
                </Stack>
              </Stack>
              </MenuItem>
              <Divider/>
              <MenuItem onClick={()=>{
               navigate("/stock/profile");
                    setAnchorEl(null); /* nessery to close the menu , outherwise it still open in profile page */
              }}>
                <PasswordIcon sx={{ mr: 2 }} />
              change the password
              </MenuItem>
                 <Divider/>

                 <MenuItem onClick={dispatch(logout(navigate))}>
                   <LogoutIcon sx={{ mr: 2 }} />
                 Logout
                 </MenuItem>
          </Menu>
          </Toolbar>
   </MyAppBar>
  )
}
export default Header;

// when we do desctrucing of the object here, we extract width and transition and assing new values to them

//? transition: theme.transitions.create('width'),
//* This line sets up a transition effect for the width property. It uses the default transition settings from the Material-UI theme, which allows for a smooth resizing of the AppBar.

//? ...(open && { ... }):
//* This spread operator conditionally applies additional styles when the open prop is true. This is where the customization for when the drawer is open happens.

//!When open is true:
//? width: calc(100% - ${drawerWidth}px):
//*This calculates the width of the AppBar to be the full width of the viewport minus the width of the open drawer (drawerWidth).
//? transition: theme.transitions.create('width', { easing, duration }):
//* This customizes the transition effect specifically for the width change.
//* easing: theme.transitions.easing.sharp: Specifies the easing function for the transition, making it more or less abrupt.
//* duration: theme.transitions.duration.enteringScreen: Sets the duration for the transition to the one defined for elements entering the screen.



/* day2: i lern how i make spical style customize Appbar :
1-give a spesific width for drawer
2- styled func for Appbar : at first i use css properyties(them in mui) to make style than 
                              seconde i check the state and make another style (another value for the properyties,here was (width and duration)) 
3- insid the MyAppBarr :-give  open a value wich is our state sidbaropen
                        -give onclick(action or fun)for the iconeButton 
                        ----so we open the drawer and change the width of Appbar in the same time,shrinkt when open ,extend when closed the Drawer*/