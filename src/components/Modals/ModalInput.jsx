import { Field } from 'formik'
import React from 'react'

export const ModalInput = ({name,label}) => {
  return (
    <Field
     type="text"
     name={name} /* key:value, key to send to the backend , value it will be in inputlable in the productModal or categorymodal.. */
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