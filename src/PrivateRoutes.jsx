import React from 'react'
import { Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function PrivateRoutes() {

   /* we store userdata in  sessionStorage in the browser ,it is more safe because it will be deleted after close the webpag or the browser ,every time i open the app i need to give the password and athor data */
   /* i can get currentuser from api,with useSelector */
   const currentUser= sessionStorage.getItem("username")|| null;
    
    if( !currentUser){
      toast.error("You need to login !!")
        return <Navigate to="/"/> }
    else{
        return<Outlet/>
        }
 
}

/* i still need the private also when i have navigate in register in authReduser,when i copy the url and send it to my frind i shoud to be sore that he make also register */

  /* in the browser i can store my data in 2 places: 
  1- localstorage : it will be there ,untill i want to delete it 
  2- sessionStorage : it will be deleted automaticly when i leave the webpage or close the browser, it is more safe */