import { Box, Modal } from '@mui/material'
import React from 'react'
import style from './style'
import { Form, Formik } from 'formik'
import ModalInput from './ModalInput'

export const FormModal = ({open,initialValues,handleSubmit,inputLabels,title}) => {
  return (
    <Modal open={open}>
            <Box sx={style}>
                 <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                   <Form>    {/* distructureing for item ={name,label} in inputlabels array in the psarent */}
                      {inputLabels.map({name,label})=>(
                        <ModalInput key={name} name={name} label={label}/>
                      )}
                           
                   </Form>
                 </Formik>
            </Box>
    </Modal>
  )
}
