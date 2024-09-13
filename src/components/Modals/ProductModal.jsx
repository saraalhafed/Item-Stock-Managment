import FormModal from './FormModal';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { uiActions } from '../../store/ui';
/* when i get products i see in the response what i need foe the modal and collect them in inputlabel array */
const inputLabels = [
  {
    name: 'name',/* same as postman (api) */
    label: 'Product Name',
  },
  {
    name: "categoryId",/* it is an obj includ name of categori and id to edit the categori */
    label: 'Category',  /* customiz our input field ,in this input there is dropedown menu*/
    arrayName: 'categories',  /* name array not important,ModalInput has property arrayName ? or not */
},
  {
    name: "brandId",
    label: 'Brand',
    arrayName: 'brands',/* if we have that in component formModal we see dropdoewn ,but to see the content i need to get the data in s*/
  },
  {
    name: 'quantity',
    label: 'Quantity',
  },
  {
    name: 'price',
    label: 'Price',
  },
];
/* for each input we need a state for formik,empty form for creat new product */
const initialState={/* here the state hold the value */
 nam:"",
 CategoryId:"",
 brandId:"",
 quantity:"",
 price:"",

}
export const ProductModal = ({open,edit,closeModal}) => {
 
  const modalData = useSelector((state)=>state.ui.modalData)
 /* what we see in the form in the modal when open , if i click on edit i see filled form with all the data value for the product to edit, when i click on newproduct i see empty form to create a new product */
 const initialValues = edit ? modalData : initialState;

  const dispatch = useDispatch();
  const categories =useSelector((state)=>state.categories.data)
  const brands =useSelector((state)=>state.brands.data)

  console.log(brands);

  const arrayData={categories,brands};

  const handleSubmit =(values,actions)=>{
    if(edit){
      dispatch(productsActions.editData(values))
    }else{
      dispatch(productsActions.createData(values))
    }
    actions.resetForm();
    actions.setSubmitting(false);
    closeModal();
  }

  const handleClose =()=>{
    dispatch(uiActions.setModalData({}));
    closeModal()
  }
  return (
    <FormModal
    open={open}
   
    initialValues={initialValues}
    handleSubmit={handleSubmit}
    handleClose={handleClose}
    inputLabels={inputLabels}
    title={edit ? "Edit Product" : "New Product"}
    arrayData={arrayData}
    />
  )
}
export default ProductModal;
/* to be sure that we add somthing without emplement for layout ,we can check in postman */



/* about github when i make commit from the repo directly than i want to puch somthing from local repo to remote i need to make pull than add,commit than push */