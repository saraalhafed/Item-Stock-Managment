import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import config from "../config/config";
const initialState ={
    currentUser: sessionStorage.getItem('username') || null,
    token: sessionStorage.getItem('token') || null,
    firstName: sessionStorage.getItem('firstName') || null,
  lastName: sessionStorage.getItem('lastName') || null,
  email: sessionStorage.getItem('email') || null,
  isAdmin: sessionStorage.getItem('isAdmin') || null,
  id: sessionStorage.getItem('id') || null, /* we need that for update user or chang password */
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // I need an action to update my state with the user's data, this fun can has any name
          /* we get the info from api ,action will give this info to oure state */
          auth(state, action) {
            state.token = action.payload.token;
            state.currentUser =
              action.payload?.user?.username || action.payload?.data?.username;  /* the info  (we take it)com from differant palces (api login from (user), api register from(data))to update the state */
            state.firstName =
              action.payload?.user?.firstName || action.payload?.data?.firstName; 
            state.lastName =
              action.payload?.user?.lastName || action.payload?.data?.lastName;
            state.email = action.payload?.user?.email || action.payload?.data?.email;
            state.isAdmin =
              action.payload?.user?.isAdmin || action.payload?.data?.isAdmin;
              state.id = action.payload?.user?._id || action.payload?.data?._id;
          },
         // username, token, firstName, lastName, and email will come from the API
    // accessing API requires a async process
    // we cant do async process in reducer
      }
})
/* we have 2 ways to make async func in reducer , way1 ia   create async thunck  */
// async action
export const login = (userInfo,navigate) => {
    return async (dispatch) => {
         // we can only use hooks in functional components  
    // const navigate = useNavigate();  to fix that i will use the hook in login component and use navigate as parameter
      /* navigate in login component make no sence ,because we need this navigate just after the success response,autside this func that means */
    try {
               const url=`${config.BASE_URL}/auth/login`; /* api documentation */

           // const {data} =await axios.post(url, userInfo)

           const { data } = await axios({
            url,
            method: 'POST',   /* api documentation */
            data: userInfo,
          });
          //if (!data?.token) {     
          //  throw new Error('Something went wrong');
          //}
         /*  const {token, username, firstName, lastName, email} = data;
          const payload = { token, username, firstName, lastName, email }; */
          // here as I have a response from the API, I can update my state
          // to update the state, I need to dispatch an action
         /*  dispatch(authSlice.actions.auth(payload)); */
         dispatch(authSlice.actions.auth(data));
         // I can also save the token to the session storage
         sessionStorage.setItem('token', data.token);
         sessionStorage.setItem('username', data.user.username);
         sessionStorage.setItem('firstName', data.user.firstName);
         sessionStorage.setItem('lastName', data.user.lastName);
         sessionStorage.setItem('email', data.user.email);
         sessionStorage.setItem('isAdmin', data.user.isAdmin);
         toast.success('Login successful');
       
      navigate('/stock/dashboard');  /* so i can use it outside the component */
        } catch (error) {
           // toast.error(error.message);  401 somthing notcorrect email or password
            toast.error(error.response.data.message); /* in api documentat ,from inspekt :_Network ,response, ican creat special errormsg acording to the response  */
        }
}
}


export const register = (userInfo, navigate) => {
    return async (dispatch) => {
      /* dispatch return a func */
      // we can omnly use hooks in functional components
      // const navigate = useNavigate();
      try {
        const url = `${config.BASE_URL}/users`;          /* register is same as login but url differant */
  
        const { data } = await axios({
          url,
          method: 'POST',
          data: userInfo,
        });
        /* 'POST':i create new user :i put somthing new in database api */
         /*  status code 4xx or 5xx axios will throw an error*/
          // fetch will not throw an error for status code 4xx or 5xx
       // if (!data?.token) { /*  my email not correct i have respons but without token data, i need that when i use fetch , in axios idont need that*/
         // throw new Error('Something went wrong');
        //}
  
        // here as I have a response from the API, I can update my state
        // to update the state, I need to dispatch an action
        dispatch(authSlice.actions.auth(data));
        // I can also save the token to the session storage
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('username', data.data.username);
        sessionStorage.setItem('firstName', data.data.firstName);
        sessionStorage.setItem('lastName', data.data.lastName);
        sessionStorage.setItem('email', data.data.email);
        sessionStorage.setItem('isAdmin', data.data.isAdmin);
        toast.success('register successful');
  
        navigate('/stock/dashboard');  /* easy for the user DIRECT TO DASHBOARD */
      } catch (error) {
        console.log(error);
        toast.error(
          error.response.data?.details ||
            error.response.data?.message ||
            error.message
        );
      }
    };
  };
  /* stor data in api and  */
   /* we need to stor it  in sesstionStorage in the browser , when i refrish the page i dont need to login again,all the data is stord in the browser */



   export const logout = (navigate) => {
    return async (dispatch) => {
      try {

       
        const url = `${config.BASE_URL}/auth/logout`;
  
        const { data } = await axios({
          url,
          method: 'GET',
          //data: userInfo,
          /* same in postman,enterduce my self ,api shoud kow how i am,in documentaion  */
         /* i need to make change in database in api so i make response and say who i am  (send my token to api throw the hraders) */
          headers: {
            Authorization: `Token ${sessionStorage.getItem('token')}`, 
          },
        
        });
        
        const info ={
            token: null,
            user: {
              username: null,
              firstName: null,
              lastName: null,
              email: null,
              isAdmin: null,
              id: null,
            },
          };
        
         
      dispatch(authSlice.actions.auth(info));
        sessionStorage.clear();
        toast.success('Logout successful');
        navigate('/');
       

      } catch (error) {
        console.log(error);
        toast.error(
          error.response.data?.details ||
            error.response.data?.message ||
            error.message
        );
      }
    };
  };
  
/* -----changPassword---- */
  export const changePassword = (newPassword) => {
    /* dispatch i dont need it because password is not from the state */
    return async (dispatch) => {
      try {
        const id = sessionStorage.getItem('id'); /* for the user */
      const url = `${config.BASE_URL}/users/${id}`;

  
        const { data } = await axios({
          url,
          method: 'PUT', // 'PATCH'
          /* send data inside the body which here */
          /* or send  data inside the headers , */
          headers: {     /* to tell api  who we are ,headers:  comunication structures with api   (from documtation in api i see how i can write hte token) */
            Authorization: `Token ${sessionStorage.getItem('token')}`,
          },
          data: { password: newPassword },
        });
  
        /* i still in login ,i just change the password ,  */
        toast.success('Password changed successfully');
       
      } catch (error) {
        console.log(error);
        toast.error(
          error.response.data?.details ||
            error.response.data?.message ||
            error.message
        );
      }
    };
  };
  export const authReducer = authSlice.reducer;