import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../config/config';
import { toast } from 'react-toastify';

const token = sessionStorage.getItem('token');

const sliceUrl = `${config.BASE_URL}/brands`;
const toastMessageTag = 'Brand';
const sliceName = 'brands';

const slice = createSlice({
  name: sliceName,
  initialState: {
    data: [],
  },
  reducers: {
    set: (state, action) => {
      // this reducer will update the entire state data
      state.data = action.payload;
    },
    add: (state, action) => {
      // this reducer will add a new category to my state
      state.data.push(action.payload);
    },
    remove: (state, action) => {
      // this reducer will remove a category from my state
      state.data = state.data.filter((item) => item._id !== action.payload);
    },
    update: (state, action) => {
      // this reducer will update a category from my state
      // so we need to find the one we want to update
      // way-1 : find the index of the one we want to update
      // after we found the index, we can update it directly
      const index = state.data.findIndex(
        (item) => item._id === action.payload._id
      );
      state.data[index] = action.payload;
      // way-2 : we can find the one we want to update and update it directly
      // item = state.data.find((item) => item._id === action.payload._id);
      // item = action.payload;
      // way-3 : we can map on data and whenever we are on the exact item we can update it
      // state.data = state.data.map((item) =>
      //   item._id === action.payload._id ? action.payload : item
      // );
    },
  },
});

// ASYNC ACTIONS
// CRUD
// get all categories
const getData = () => async (dispatch) => {
  try {
    const url = sliceUrl;
    const { data } = await axios({
      url,
      method: 'GET',
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    // here we get all the categories from the server
    // now we need to set them in our state
    // we have a reducer for this action
    // so we need to dispatch it

    dispatch(slice.actions.set(data.data));
  } catch (error) {
    console.log(error);
    if (error.status === 403) {
      // this is not same all the time. It depends on the API response structure
      // To provide a more detailed error message, you need to check the API response structure
      // and provide a more detailed error message
      toast.error(error.response.data.details);
    } else {
      // this is not same all the time. It depends on the API response structure
      toast.error(error.response.data?.message || error.message); // error.message will always exist and you can always use it.
    }
  }
};

// add category
const createData = (input) => async (dispatch) => {
  try {
    const url = sliceUrl;
    const { data } = await axios({
      url,
      method: 'POST',
      headers: {
        Authorization: `Token ${token}`,
      },
      data: input,
      // data: {name: category.name}
      // data: firms
      // data: {name: firms.name, address: firms.address, phone: firms.phone, image: firms.image}
      // data: {name: category.categoryName, description: category.categoryDescription, image: category.categoryImage}  ,
    });

    // with this dispatch, I added one category and afterwards I added the same category to my state
    dispatch(slice.actions.add(data.data));
    toast.success(`${toastMessageTag} added successfully`);
    // If this application is used by multiple users, there is a possibility that there may be more categories added by them
    // I can use the following function to get all categories from the server
    dispatch(getData());
  } catch (error) {
    console.log(error);
    if (error.status === 403) {
      toast.error(error.response.data.details);
    } else {
      toast.error(error.response.data?.message || error.message); // error.message will always exist and you can always use it.
    }
  }
};

// delete category
const deleteData = (id) => async (dispatch) => {
  try {
    const url = `${sliceUrl}/${id}`;
    const { data } = await axios({
      url,
      method: 'DELETE',
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    dispatch(slice.actions.remove(id));
    toast.success(`${toastMessageTag} deleted successfully`);

    dispatch(getData());
  } catch (error) {
    console.log(error);
    if (error.status === 403) {
      toast.error(error.response.data.details);
    } else {
      toast.error(error.response.data?.message || error.message);
    }
  }
};

// update category
const editData = (input) => async (dispatch) => {
  try {
    // here we get the latest version of the data we want to update
    const latestDataFromAPI = await getSingleData(input._id);

    // this is to check if the data we want to update has been updated by another user
    // to do so we use the updatedAt field
    // updatedAt field will always be different if the data has been updated by another user
    if (input?.updatedAt && latestDataFromAPI.updatedAt !== input.updatedAt) {
      // warn the user about this change
      const confirm = window.confirm(
        'This data has been updated by another user. Are you sure you want to edit it?'
      );
      // if the user doesn't want to edit the data, we don't want to update it
      if (!confirm) return;
    }
    // console.log(latestDataFromAPI);
    const url = `${sliceUrl}/${input._id}`;
    const { data } = await axios({
      url,
      method: 'PUT',
      headers: {
        Authorization: `Token ${token}`,
      },
      data: input,
    });

    dispatch(slice.actions.update(data.data));
    toast.success(`${toastMessageTag} updated successfully`);

    dispatch(getData());
  } catch (error) {
    console.log(error);
    if (error.status === 403) {
      toast.error(error.response.data.details);
    } else {
      toast.error(error.response.data?.message || error.message);
    }
  }
};

const getSingleData = async (id) => {
  try {
    const url = `${sliceUrl}/${id}`;
    const { data } = await axios({
      url,
      method: 'GET',
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    return data.data;
  } catch (error) {
    console.log(error);
    if (error.status === 403) {
      toast.error(error.response.data.details);
    } else {
      toast.error(error.response.data?.message || error.message);
    }
  }
};

export const brandsReducer = slice.reducer;
export const brandsActions = {
  getData,
  createData,
  deleteData,
  editData,
};