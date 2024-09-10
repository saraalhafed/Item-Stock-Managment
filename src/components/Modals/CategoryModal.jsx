
import { FormModal } from './FormModal'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { uiActions } from '../../store/ui';
import { categoriesActions } from '../../store/categories';

const inputLables=[/* to creat 1 input field for the modal,because one obj */
  {name: "name",
    lable: "Category Name"
  }
]
const CategoryModal=({open,closeModal,edit, modalValues})=> { /* way1 withprops i collect the  */

  
const dispatch= useDispatch()
const modalData = useSelector((state)=>state.ui.modalData)/* way2 with store mor easy and clean code */

 // here we need to check if we are editing or not
  // our initial value will have different value depending on we are in edit mode or not
  // if edit is true, initial value will be modalValues
  // if edit is false, initial value will be an empty object
  const initialValues = edit
    ? modalData // modalValues // modalData
    : // modalValues is a prop that we passed from the parent component to implement way-2
      // modalData is state in our Redux shop to implement way-1
      {
        name: '',
      };

const handleSubmit = (values, actions) => {
    if (edit) {
      dispatch(categoriesActions.editData(values));
    } else {
      dispatch(categoriesActions.createData(values));
    }
    actions.resetForm();
    actions.setSubmitting(false);
    closeModal();
  };

const handleClose=()=>{
  dispatch(uiActions.setModalDate({}));/* clear every thing insid the form inputs  */
  closeModal() /* than close the modal */
}
  return (
   <FormModal 
     open={open}
     initialValues={initialValues}
     handleSubmit={handleSubmit}
     handleClose={handleClose}
     inputLables={inputLables}
   
     title={edit ? 'Edit Category' : 'New Category'}
     arrayData={null}
     />
  )
}
export default CategoryModal;