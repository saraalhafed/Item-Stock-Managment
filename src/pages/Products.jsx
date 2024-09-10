import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { categoriesActions } from '../store/categories';
import { productsActions } from '../store/products';

export default function Products() {
  const [open,setOpen] =useState(false);
  const[edit,setEdit]=useState(false);
  const products = useSelector((state)=> state.products.data);
  const dispatch =useDispatch();

  useEffect(()=>{
      dispatch(productsActions.getData()); /* get all the products from api */
      dispatch(categoriesActions.getData());/* get all the categories  to see them in input in dropdown menu */
      dispatch(brandsActions.getData());/* also get all the brands to see it in the input of modal */
  },[])
  const openModal=()=>{
    setOpen(true);
  }
  const closeModal=()=>{
    setOpen(false);
    setEdit(false)
  }

  const handleEdit =(data)=>{ /* for the modal  */
    setEdit(true);
    setOpen(true);
    dispatch(productsActions.updat)
  }
  return (
    <div>Products</div>
  )
}
