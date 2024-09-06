import { TextField } from '@mui/material'
import { Field } from 'formik'
import React from 'react'

export const InputForm = ({name,lable,errors,touched}) => {
  return (
    <Field
    as={TextField}
    name={name}
    fullWidth
    lable={lable}/>
  )
}
