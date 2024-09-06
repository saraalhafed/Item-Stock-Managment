import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { deleteCategory, getCategories } from '../store/categories';
import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import CategoryModal from '../components/Modals/CategoryModal';
const Categories = () =>{
const [open,setOpen]=useState(false);/* to open the modal */
const [edit,setEdit]=useState(false);

  const categories = useSelector((state)=>(state.categories.data))/* get all the categories data from api from slice  */
  // when this page is loaded we need to get all categories from the server
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(getCategories())
  },[])      /*  getcategories trigger once at runnig the App */
  /* now we have access to all the data inside each categories,_id..,name.. */
  const openModal=()=>{
 setOpen(true);
  }

  const closeModal=()=>{
    setOpen(false);
    setEdit(false);
     }
  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" p={5}>
        <Typography component="h1" variant="h5" color="inherit" noWrap>
          Categories
        </Typography>
        <Button  variant="contained" onClick={openModal}>
          New Category
        </Button>
      </Stack>
      {/* --table mui */}
      <Container maxWidth="lg">  {/* default 900px in mui */}
           <TableContainer component={Paper} sx={{ alignItems: 'center' }}>{/* important to give it paper */}
                   <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>#</TableCell>
                            <TableCell align='center'>Name</TableCell>
                            <TableCell align='center'>Name of Products</TableCell>
                            <TableCell align='center'>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                       {/* table body for categories info */}
          {/* go to postman what kind of data we have */}
                    <TableBody>            {/* ? important (when i have the respons do somthing) ,somtimes i cannot see the categories ,not get it from api */}
                      {categories?.map((category)=>(
                           <TableRow key={category._id}> {/* important to give key */}
                                <TableCell align='center'>{category._id}</TableCell>  {/* (_id) like in postman */}
                                <TableCell align='center'>{category.name}</TableCell>
                                <TableCell align='center'>0</TableCell> {/* products number */}
                                <TableCell align='center'>
                                  <EditIcon   sx={{ color: 'goldenrod', cursor: 'pointer', mx: 1 }}/>
                                    <DeleteOutlineIcon
                                           sx={{ color: 'red', cursor: 'pointer', mx: 1 }}
                                           onClick={()=>dispatch(deleteCategory(category._id))}
                                                /* we have the access to id because we get all the categories from useeffect */
                                   />
                                </TableCell>
                           </TableRow>
                      ))}
                    </TableBody>
                   </Table>
           </TableContainer>
           <CategoryModal open={open} closeModal={closeModal} edit={edit}/>
      </Container>
    </Box>
  )
}
export default Categories;
/* we need slice for crud operations  ,we will share func between categories ,modalcategories,formmodal, component */