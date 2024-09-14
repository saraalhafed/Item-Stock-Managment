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
const Products = () => {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editingRowId, setEditingRowId] = useState(null);/* to collect all the data in the row */

  const products = useSelector((state) => state.products.data);/* stor the fetching data here inside the state */
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productsActions.getData());/* get all the products */
    dispatch(brandsActions.getData());       /* without get all the categories and brand we cannot see them in the modal,also in the table */
    dispatch(categoriesActions.getData());
  }, []);

  const closeModal = () => {
    setOpen(false);
    setEdit(false);
  };

  const openModal = () => {
    setOpen(true);
  };

  const handleEdit = (data) => {   
    setEdit(true);
    setOpen(true);

    console.log(data);

    // here it is better to remove unnecessary data before sending to the API,it can be crach ,(product data)
    const {_id, name, brandId, categoryId, quantity, price} = data
/* i give the data to modaldata when i click on the edit icon ,than open the modal with filled form wich i want to edit  after changing the data i click on edit button so handlesubmit triggert and call editData fuc  */
    dispatch(
      uiActions.setModalData({
        _id,
        name,
        brandId,
        categoryId,
        quantity,
        price,
      })
    );
  };

  const handleDelete = (id) => {      /* when i click on delete icon i delete the product dirct */
    dispatch(productsActions.deleteData(id));
  };

  const handleCellEditStart = (params) => {
    setEditingRowId(params.id); /* i need to now wich row  */
  };
/* stop editing,reset  */
  const handleCellEditStop = () => {
    setEditingRowId(null);
  };

  const handleSave = (data) => {  /* to handel wen we click edit fron cell we see the icon save instead of edit §del */
    const { _id, name, quantity, price } = data;

    dispatch(
      productsActions.editData({
        _id,
        name,
        quantity,
        price,
      })
    );
  };
/* to see all the products in the page inside table we use for that DataGrid wich need columns and rows */
  const columns = [
    {
      field: 'id', /* here not except _id */
      headerName: '#',
      flex: 0.2,     /* if we have 600 for the size so we add (0.2+1+1+1+0.5+0.5=15) than 600/15 the result will mul with each field so it is just sharing the siz with all the fielde*/
      minWidth: 50,
      //width: 100,  /* we can with certin width or flex +minwidth */
    },
    {
        field: 'name',
        headerName: 'Name',
        flex: 1,
        minWidth: 150,
        editable: true, /* just for edit the input but not api  */
      },
      { field: 'category', headerName: 'Category', flex: 1, minWidth: 150 },/* in this way divide the size */
    { field: 'brand', headerName: 'Brand', flex: 1, minWidth: 150 },
    { field: 'quantity', headerName: 'Quantity',editable: true, flex: 0.5, minWidth: 100 },
    { field: 'price', headerName: 'Price', flex: 0.5,editable: true, minWidth: 100 },
    {
      field: 'action',
      headerName: 'Actions',
      renderCell: (params) => (
        <Stack direction="row" spacing={1} mt={1} alignItems={'center'}>
                {/* if edit from the cell dirct, or for all the row from editicon */}
                {/* throw the editing for one cell we can giv the field (editable: true) than when we click on the cell and change the value we see save icon to update the old value, but  without handlesave just here i can see the new change , not for api*/}
                   {/* handlesave to make edit in api */}
          {editingRowId === params.row.id ? ( /* editingRowId an obj to collect all the data inside it ,when we edit */
            <IconButton onClick={() => handleSave(params.row)}>
              <SaveIcon sx={{ color: 'green' }} />
            </IconButton>
          ) : (
            <>
              <IconButton onClick={() => handleEdit(params.row)}>
                <EditIcon sx={{ color: 'orange' }} />
              </IconButton>
              <IconButton onClick={() => handleDelete(params.row.id)}>{/* id in row take the value _id from api */}
                <DeleteOutlineIcon sx={{ color: 'red' }} />
              </IconButton>
            </>
          )}
        </Stack>
      ),
    },  /* func takes (variable params)in mui  it return jsx code to render somthing */
               /* params inclode allthe value in row */
               /*  check  in mui : gridcellparams api */
  
  ];

  console.log(products);
/* important :  the name for variable in rows to matching with field name in columns(not nrsery as api but the value of it shoud be as api ) */
  const rows = products.map((item) => ({
    id: item._id, /* nneded for the table */
    _id: item._id,/* need it for api */
    name: item.name, /* value from api , check it in postman */
    category: item.categoryId.name, /* needed for table ,tosee the categoy name in the table */
    categoryId: item.categoryId._id,/* need it for api to get the name (when i want edit the product in modal),working just with id ,to get the category from api and give it for edit */
    brand: item.brandId.name,
    brandId: item.brandId._id,/* to see the value in the modal for edit */
    quantity: item.quantity,
    price: item.price,
  }));

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" p={5}>
        <Typography component="h1" variant="h5" color="inherit" noWrap>
          Products
        </Typography>
        <Button variant="contained" onClick={openModal}>
          New Product
        </Button>
      </Stack>
           
      <Container maxWidth="xl">
        <DataGrid
          columns={columns}
          rows={rows}
          slots={{ toolbar: GridToolbar }}/* to addd filtering to the DataGrid*/
          disableSelectionOnClick /* to disable select allthe row */
          onCellEditStart={handleCellEditStart}  /* func in datagrid */
          onCellEditStop={handleCellEditStop}
        />
      </Container>

      <ProductModal open={open} closeModal={closeModal} edit={edit} />
    </Box>
  );
};

export default Products;
