import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { productsActions } from '../store/products';
import { uiActions } from '../store/ui';
import {
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import ProductModal from '../components/Modals/ProductModal';
import { brandsActions } from '../store/brands';
import { categoriesActions } from '../store/categories';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
const Products=() =>{
  const [open,setOpen] =useState(false);
  const[edit,setEdit]=useState(false);
  const [editingRowId, setEditingRowId] = useState(null);/* to collect all the data in the row */

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

  const handleEdit =(data)=>{ /*if click on edit i give data for the modal  throw modaldata */
    setEdit(true);
    setOpen(true);
    console.log(data)
    const {_id,name,categoryId,brandId,price,quantity}=data;
    dispatch(uiActions.setModalData(
      _id,name,categoryId,brandId,price,quantity
    ))
  }
  const handleDelete =(id)=>{
    dispatch(productsActions.deleteData(id));
  }
  
  const handleCellEditStart = (params) => {/* when i click on the icon save i give all data to handleSave ,i need just id for row */
    setEditingRowId(params.id); /* i need to now wich row  */
  };            /*  DataGrid need this fuc to start (give row.id for the state) */
/* stop editing,reset the obj to choose another row  */
  const handleCellEditStop = () => { 
    setEditingRowId(null); /* and also dataGrid need to rest the state */
  };

  const handleSave=(data)=>{
    const {_id,name,quantity,price}=data;
    dispatch(
      productsActions.editData(
      {_id,name,quantity,price}
    ))

  };
   /* we need to render the products in DataGrid wich need columns and rows  */
   const columns =[
    {field:"id" , headerName:"#", flex: 0.2, minWidth: 50 },
    {field:"name" , headerName:"Name", flex: 1, minWidth: 150 ,editable: true},
    {field:"category" , headerName:"Category", flex: 1, minWidth: 150 },
    {field:"brand" , headerName:"Brand", flex: 1, minWidth: 150 },
    {field:"quantity" , headerName:"Quantity", flex: 0.5, minWidth: 100,editable: true },
    {field:"price" , headerName:"Price", flex: 0.5, minWidth: 100 ,editable: true},
    {field:"action" , headerName:"Actions", renderCell:(params)=>(

      <Stack direction="row" spacing={1} mt={1} alignItems={'center'}>

      {/* if edit from the cell dirct, or for all the row from editicon */}
      {/* throw the editing for one cell we can giv the field (editable: true) than when we click on the cell and change the value we see save icon to update the old value, but  without handlesave just here i can see the new change , not for api*/}
         {/* handlesave to make edit in api ,but  for specific fields*/}
              {editingRowId === params.row.id ? ( /* editingRowId an obj to collect all the data inside it ,when we edit */
                      <IconButton onClick={()=>handleSave(params.row)}>
                        <SaveIcon sx={{ color:"green"}}/>
                      </IconButton>
              ): (
                 <>
                   <IconButton onClick={()=>handleEdit(params.row)}>
                         <EditIcon sx={{ color:"orang"}}/>
                   </IconButton>
                   <IconButton onClick={()=>handleDelete(params.row.id)}> {/* id in row take the value _id from api */}
                        <DeleteOutlineIcon sx={{ color:"red"}} />
                   </IconButton>
                   </>
              )}
             </Stack>
    ), }
   ]  /* () without return ,{} with return */
  /* i need rows to get all the data about one product i loop on the  products and get som data to render it in datagrid*/
   const rows= products.map((item)=>({
       id:item._id , /* the key must matching with field in columns */
       _id:item._id,
       name:item.name,
       category:item.categoryId.name,/* to see in the table  */
       categoryId:item.categoryId._id,/* to get from api and see in modal to edit categoy of product */
       brand:item.brandId.name,
       brandId:item.brandId._id,
       quantity:item.quantity,
       price:item.price,
   }));
  return (
  <Box>
    <Stack  direction="row" justifyContent="space-between" p={5}>
      <Typography component="h1" variant="h5" color="inherit" noWrap>
        Products</Typography>
        <Button   variant="contained"  onClick={openModal}>
          New Product
          </Button>
    </Stack>
    <Container maxWidth="xl">
      <DataGrid
       rows={rows}
       slots={{ toolbar: GridToolbar }}/* to addd filtering to the DataGrid*/
          disableSelectionOnClick /* to disable select allthe row */
       onCellEditStart={handleCellEditStart}  /* func in datagrid */
       onCellEditStop={handleCellEditStop}
      />
    </Container>
    
    <ProductModal open={open} 
    closeModal={closeModal}
    edit={edit}/>
  </Box>
  )
}
export default Products;
/* 
1-import icon 
2-stat for stor datas row
3-enable:true in the field
4- the condiction in column :editingRowId === params.row.id
5-handleSave to eadit data in api 
6handleCellEditStart :to give the id of row
   handleCellEditStop:to resaet the editingRowId=null
7-in DataGrid : addonCellEditStart={handleCellEditStart}   func in datagrid 
          onCellEditStop={handleCellEditStop} */