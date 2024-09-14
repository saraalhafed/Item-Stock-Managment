import { Box, Button, Container, Grid, Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardComponent from '../components/CardComponent';
import { firmsActions } from '../store/firms';
import { uiActions } from '../store/ui';
import FirmModal from "../components/Modals/FirmModal"
import {
  Map as MapIcon,
  ViewCarousel as ViewCarouselIcon,
} from '@mui/icons-material';
import  MapComponent  from '../components/MapComponent';
const  Firms= () => {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const[isMapView,setIsMapView]=useState(false)
  const firms = useSelector((state) => state.firms.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(firmsActions.getData());
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
    dispatch(firmsActions.deleteData(id)); /* canot use it direct in bottun becuse the cardComponent is reusable code in another page (firm )so in this case we need to know what we need to delet abrand or firm ?! */
       /* from this page take the brand and deleted ,we pass the id from here */
  };
  return (
    <Box>
    <Stack direction="row" justifyContent="space-between" p={5}>
      <Typography component="h1" variant="h5" color="inherit" noWrap>
        Firms
      </Typography>
      <Button variant="contained" onClick={openModal}>
        New Firms
      </Button>
    </Stack>
    <Container maxWidth="xl"> 
      <Stack direction="row" justifyContent="space-between">
         <Box flexGrow={1}/>
         <ToggleButtonGroup
         exclusive
         size='smal'
         value={isMapView}
        onChange={(e,value)=>setIsMapView(value)} >
          <ToggleButton value={false}>
             <ViewCarouselIcon/>
          </ToggleButton>
          <ToggleButton value={true}>
             <MapIcon/>
          </ToggleButton>
         </ToggleButtonGroup>
      </Stack>
    
      {isMapView?(
        <MapComponent/>
      
      ): ( 
        <Grid container spacing={5}>
        {firms.map((item) => (
            <Grid item key={item._id} xs={12} md={6} lg={3}> {/* give me responseiv card the same size,in grid i give width for each card*/}
              <CardComponent                               /* in card component i give height so each card has the same size */
              item={item}
              onEdit={handleEdit}
              onDelete={handleDelete}  /* card comopnent  ,reuseable, icanot use dispatch here i want to konw what is will delet brand or firms */
            />
            </Grid>
                 ))}
            </Grid>
         )
      }
    <FirmModal open={open} closeModal={closeModal} edit={edit} />
    </Container>
  </Box>
  )
};

export default Brand;
