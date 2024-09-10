import { createSlice } from "@reduxjs/toolkit";
import { toast} from "react-toastify";
import config from "../config/config"
import axios from "axios";

const token = sessionStorage.getItem('token');


const categoriesSlice=createSlice({
    name:"categories",
    initialState:{
        data:[],
        /* we collect all the categories here,at first we dont have any category */
    },
    reducers:{
        /* contain all the action wich get the response from api to update our data */
        /* to get all categories from api and update our state (data) */
        setCategories:(state,action)=>{
            state.data=action.payload;
            // this reducer will update the entire state data, get the categories and updete the state data
         },
        addCategory:(state,action)=>{
            state.data.push(action.payload);
             // this reducer will add a new category to my state,data is an array (we add item with push)
        },
        removCategory:(state,action)=>{
            state.data =state.data.filter((item)=> item._id !== action.payload
            )
            // this reducer will remove a category from my state
             /* will kepp all categories in data[],just wich (!==) not equal payload */
        },
        updateCategory:(state,action)=>{
            const index= state.data.findIndex((item)=> item._id === action.payload._id)
                     state.data[index]=action.payload
        }
             /* change one thig ,spesific in the state [] */
            // this reducer will update a category from my state
            // so we need to find the one we want to update
            // way-1 : find the index of the one we want to update
            // after we found the index, we can update it directly
    }
     // way-2 : we can find the one we want to update and update it directly
            // item = state.data.find((item) => item._id === action.payload._id);
            // item = action.payload;
            // way-3 : we can map on data and whenever we are on the exact item we can update it
      // state.data = state.data.map((item) =>
      //   item._id === action.payload._id ? action.payload : item
      // );
})
// ASYNC ACTIONS
// CRUD
// get all categories ,we send nothing
export const getCategories =()=> async (dispatch)=>{
    try{ 
        const url=`${config.BASE_URL}/categories`;
        const {data}= await axios({
            url,
            method:"GET",
            headers:{
                Authorization: `Token ${token}`}
        }) 
        // here we get all the categories from the server
    // now we need to set them in our state
    // we have a reducer for this action
    // so we need to dispatch it
        dispatch(categoriesSlice.actions.setCategories(data.data))     
             /*     /* i recive data  */
  /* no taost for successufl user make nothing ,no userinteraction here */ 

    }catch(error){
 console.log(error);
 toast.error(error.message)
    }
    
}
/* to add new category,we send new data of category */
export const addCategory = (category) => async (dispatch)=>{
    try{ 
        const url=`${config.BASE_URL}/categories`;
        const {data}= await axios({
            url,
            method:"POST",    /* api roles */
            headers:{
                Authorization: `Token ${token}`},
                data: category,
        }) 
  // with this dispatch, I added one category and afterwards I added the same category to my state
        dispatch(categoriesSlice.actions.setCategories(data.data))   
        toast.success("Category added successfully")  ;
         dispatch(getCategories());
        // If this application is used by multiple users, there is a possibility that there may be more categories added by them
    // I can use the following function to get all categories from the server
    /* gut to have it to see what the aother make in the app ,it can be mor or less category */
    }catch(error){
 console.log(error);
 toast.error(error.message)
    }
    
}
 /* to delete we send id */
export const deleteCategory=( id)=> async (dispatch)=>{

try{ 
    const url =`${config.BASE_URL}/categories/${id}`;
          const {data}=await axios({
                 url, 
                 method:"DELETE",
                 headers:{
                    Authorization: `Token ${token}`
                 },
          }) 
          /* update the stae after delete this category */
            dispatch(categoriesSlice.actions.removCategory(id));/* i remov just this categry wich has this id */
              toast.success("Category deleted successfully")
           dispatch(getCategories());/* to see all the categories aftr the delete */
        }catch(error){
    console.log(error)
    toast.error(error.message)
}

}
/* to updat/edit we send category */
export const editCategory= (category)=> async (dispatch)=>{
    try{ 
        const url =`${config.BASE_URL}/categories/${category._id}`/* endpoint from api */
        const {data}= await axios({
            url,
            method:"PUT",
            headers:{
                Authorization: `Token ${token}`
            },
            data:category,
        })
          /* here we send data to change the data in api */
    /* i change the categoriey(id,name) to new data(,id,new name ) throw compare id*/
        dispatch(categoriesSlice.actions.updateCategory(data.data)) /* inpostman categories insid data */
        toast.success("Category updated successfully")
            dispatch(getCategories())
    }catch(error){
        console.log(error);
        toast.error(error.message)
    }
}
export  const categoriesReducer= categoriesSlice.reducer;