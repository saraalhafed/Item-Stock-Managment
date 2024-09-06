
import { FormModal } from './FormModal'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { uiActions } from '../../store/ui';
import { addCategory } from '../../store/categories';

const inputLables=[/* to creat 1 input field for the modal,because one obj */
  {name: "name",
    lable: "Category Name"
  }
]
const CategoryModal=({open,closeModal,edit})=> {

  initialValues={
  name:"",       /* 1 input field need 1 state (name) */
}
const dispatch= useDispatch()
const modalData = useSelector((state)=>state.ui.modalData)

const handleSubmit=(values,actions)=>{
  actions.setSubmitting(false)
dispatch(addCategory(values));
actions.resetForm();
closeModal()
}
const handleClose=()=>{
  dispatch(uiActions.setModalDate({}));
  closeModal()
}
  return (
   <FormModal 
     open={open}
     initialValues={initialValues}
     handleSubmit={handleSubmit}
     handleClose={handleClose}
     inputLables={inputLables}
     title={"New Category"}

     />
  )
}
export default CategoryModal;