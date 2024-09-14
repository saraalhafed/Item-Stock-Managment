import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import {
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { firmsActions } from '../store/firms';
import { productsActions } from '../store/products';
import { purchasesActions } from '../store/purchases';
import { uiActions } from '../store/ui';

import { salesActions } from '../store/sales';
import SaleModal from '../components/Modals/SaleModal';

const Sales = () => {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const sales = useSelector((state) => state.sales.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productsActions.getData());/* include everything category and brand */
    dispatch(salesActions.getData());
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

    // here it is better to remove unnecessary data before sending to the API

    const { _id, productId, quantity, price } = data;

    dispatch(
      uiActions.setModalData({
        _id,
        productId,
        quantity,
        price,
      })
    );
  };

  const handleDelete = (id) => {
    dispatch(salesActions.deleteData(id));
  };

  const columns = [
    {
      field: 'id',
      headerName: '#',
      flex: 0.2,
      minWidth: 50,
    },
    { field: 'product', headerName: 'Product', flex: 1, minWidth: 150 },
    { field: 'brand', headerName: 'Brand', flex: 1, minWidth: 150 },
    { field: 'category', headerName: 'Category', flex: 1, minWidth: 150 },
    { field: 'quantity', headerName: 'Quantity', flex: 0.5, minWidth: 100 },
    { field: 'price', headerName: 'Price', flex: 0.5, minWidth: 100 },
    {
      field: 'total_price',
      headerName: 'Total Price',
      flex: 0.5,
      minWidth: 100,
    },
    { field: 'owner', headerName: 'Owner', flex: 1, minWidth: 150 },
    { field: 'date', headerName: 'Date', flex: 0.5, minWidth: 100 },
    {
      field: 'action',
      headerName: 'Actions',
      renderCell: (params) => (
        <Stack direction="row" spacing={1} mt={1} alignItems={'center'}>
          <IconButton onClick={() => handleEdit(params.row)}>
            <EditIcon sx={{ color: 'orange' }} />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row.id)}>
            <DeleteOutlineIcon sx={{ color: 'red' }} />
          </IconButton>
        </Stack>
      ),
    },
  ];

  console.log(sales);
/* how data is change ,ican access brand and categories inside the products ,from postman mor clear */
  const rows = sales.map((item) => ({
    id: item._id,
    _id: item._id,
    product: item.productId.name,       
    productId: item.productId._id,
    brand: item.brandId.name, /* i can see the value for brand intable */
    brandId: item.brandId._id, /* for edit i get value from api  */
    category: item?.productId?.categoryId?.name, /* ? initialy api not get the value , */
    categoryId: item?.productId?.categoryId?._id,/* api structure is inside the productId */
    /* i need to check api in postman */
    
    total_price: item.amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, ','),
    // this regex here is used to add commas to every 3 digits
     /* postman  getsales */
   
    owner: item.userId.username,         /* place a(,) after 2 number */
    date: item.createdAt, 
    quantity: item.quantity,
    price: item.price,
  }));

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" p={5}>
        <Typography component="h1" variant="h5" color="inherit" noWrap>
          Sales
        </Typography>
        <Button variant="contained" onClick={openModal}>
          New Sale
        </Button>
      </Stack>

      <Container maxWidth="xl">
        <DataGrid
          columns={columns}
          rows={rows}
          slots={{ toolbar: GridToolbar }}
          disableSelectionOnClick
        />
      </Container>

      <SaleModal open={open} closeModal={closeModal} edit={edit} />
    </Box>
  );
};

export default Sales;
