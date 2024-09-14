import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { brandsActions } from '../store/brands';
import { uiActions } from '../store/ui';
import { useEffect } from 'react';
import { Box, Button, Container, Stack, Typography, Grid } from '@mui/material';
import CardComponent from '../components/CardComponent';
import BrandModal from '../components/Modals/BrandModal';


const Brand = () => {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const brands = useSelector((state) => state.brands.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(brandsActions.getData());
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

    dispatch(uiActions.setModalData(data));
  };

  const handleDelete = (id) => {
    dispatch(brandsActions.deleteData(id)); /* canot use it direct in bottun becuse the cardComponent is reusable code in another page (firm )so in this case we need to know what we need to delet abrand or firm ?! */
       /* from this page take the brand and deleted ,we pass the id from here */
  };
  return (
    <Box>
    <Stack direction="row" justifyContent="space-between" p={5}>
      <Typography component="h1" variant="h5" color="inherit" noWrap>
        Brands
      </Typography>
      <Button variant="contained" onClick={openModal}>
        New Brand
      </Button>
    </Stack>
    <Container maxWidth="xl"> 
    <Grid container spacing={5}>
          {brands.map((item) => (
            <Grid item key={item._id} xs={12} md={6} lg={3}> {/* give me responseiv card the same size,in grid i give width for each card*/}
              <CardComponent                               /* in card component i give height so each card has the same size */
              item={item}
              onEdit={handleEdit}
              onDelete={handleDelete}  /* card comopnent  ,reuseable, icanot use dispatch here i want to konw what is will delet brand or firms */
            />
            </Grid>
            ))}
    </Grid>
    <BrandModal open={open} closeModal={closeModal} edit={edit} />
    </Container>
  </Box>
  )
};

export default Brand;
