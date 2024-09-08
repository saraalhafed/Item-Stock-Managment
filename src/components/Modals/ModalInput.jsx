import { Field } from 'formik'
import React from 'react'

export const ModalInput = ({name,label}) => {
  return (
    <Field
     type="text"
     name={name}
     label={label}
     variant="outlined"
  required
  as={TextField} /*field from formik ,so i want to take mui field style */
  fullWidth
  sx={{ mb: 2 }}
    
    />
  )
}
/* validation proptypes ,both string*/
export default ModalInput;