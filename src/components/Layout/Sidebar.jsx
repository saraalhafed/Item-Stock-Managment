import React from 'react'

import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import StarsIcon from '@mui/icons-material/Stars';
import CategoryIcon from '@mui/icons-material/Category';

import config from "../../config/config"
import { styled ,Drawer, Toolbar, List,ListItem, ListItemIcon, ListItemText} from '@mui/material';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
const drawerWidth= config.drawerWidth;
/* customize Drower: way 2 : check the open state and change (width,duration) ,way1 was spredoperator(...) the original style*/
const MyDrawer=styled(Drawer)(({theme,open})=>({  /* i go to mui -drawer api -css classes :to provide additional style to the drawer ,to use the class (.MuiDrawer-paper') */
'& .MuiDrawer-paper':{ /* inside this class i can use any css properity */
position:"relative",
whiteSpace:"nowrap",         /* from theme default */
backgroundColor: '#1976D2',   /*  css camelcase */
boxSizing: "border-box",
width: open ? `${drawerWidth}px` : theme.spacing(7), /* if the sidbar open the Drower take the big width, if closed the width just 7 spacing */
transition: theme.transitions.create("width",{
  easing: theme.transitions.easing.sharp,  
  duration: open 
                ? theme.transitions.duration.enteringScreen     /* just number value from theme default in mui (default theme viwer) */
                : theme.transitions.duration.leavingScreen        
}),
overflowX: open ? "visible" : "hidden" , /* for the content of the drower ,sidebar open the whole content visible , */


}
}))/*way2 : this way to style  more clean code better than spred operator(update multiple thing in one chek of the state , here we check every properity and updated)  */

/* we need an array for the content of drawer */
const menuItems = [
  {title:"Dashboard" , icon: <DashboardIcon/>, path: "/stock/dashboard"},
  {title: "Products" , icon: <InventoryIcon/>, path: "/stock/products"},
  {title:"Sales" , icon: <ReceiptIcon/>, path: "/stock/sales"},
  {title: "Purchases" , icon: <ShoppingCartIcon/>, path: "/stock/purchases"},
  {title: "Firms", icon: <AccountBalanceIcon/>, path: "/stock/firms"},
  {title: "Brands" , icon: <StarsIcon/>, path: "/stock/brand"},
  {title: "Categories", icon: <CategoryIcon/>, path: "/stock/categories"},
]
 /* i can give any name for the keys , what imortant to put them in correct position  in ListItem*/


 const Sidebar = () => {
  const {sidebarOpen}=useSelector((state)=> state.ui) ;/* the state open we use it in header and sidebar so we put it in the reduser ui */
  return (
    <MyDrawer variant='permanent' open={sidebarOpen}> {/* permanent to apear drower always in the layout ,open to change the width of the drawer and AppBar*/}
          <Toolbar/> {/* to push the content down */}
          <List component="nav" >
             {menuItems.map((item,index)=>(
                   <ListItem
                   key={index}
                   component={NavLink}
                   to={item.path}
                   title={item.title}
                   sx={{color: "white"}}>
                          <ListItemIcon   sx={{color: "white"}}>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.title}/>

                   </ListItem>
             ))}
          </List>
    </MyDrawer>
  )
}
export default Sidebar;

/* component={NavLink} : to go to differant pages */