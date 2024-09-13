import { Box, Button, FormControlLabel, InputLabel, MenuItem, Modal, Select, Stack } from '@mui/material'
import React from 'react'
import style from './style'
import { Field, Form, Formik } from 'formik'
import ModalInput from './ModalInput'
import  PropTypes  from 'prop-types';
 const FormModal = ({open,initialValues,handleClose,handleSubmit,inputLabels,title,arrayData}) => {
  
  return (
    <Modal open={open}>
           <Box sx={style}>  {/* object style in seperat file ,for sx,so we have mor clean code */}
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                  <form>
                    {/* we need to loop on the inputLabels wich is in the parent (productModal for example)
                    to create  for each item an input field  */}
                    {inputLabels.map((item)=>{
                         // console.log(item);
                          // console.log(arrayData); very important to see the data in dropbdown menu is get brans in products page at first useeffect
                     {/*use return here ,block code */}
                     // console.log(arrayData); very important to see the data in dropbdown menu is get brans in products page at first useeffect
                          /* more easy to add this props inside the inputLABEL in productModal and check the condition here to apeear normal input field or with dropdown menu */
                  // we need to check whether input label(item) has arrayName
              // if it does, we need to render a select input
              // if not, we need to render a text input
                        return item.arrayName ? (
                             <FormControlLabel sx={{width:"100%",mb:2}} >
                                 <InputLabel>{item.label}</InputLabel>
                                  <Field
                                   as={Select} /* to show a menu  */
                                   name={item.name}
                                   label={item.label}
                                   required
                                   key={item.name}
                                  >

                                  {/* we mean each item has arrayName (categories or brand ) arrayData[categories] for example ,creat options*/}
                                  {arrayData[item.arrayName].map((element)=>(
                                                   <MenuItem key={element._id} value={element._id}>
                                                      {element.name}
                                                     </MenuItem>
                                   ))
                                   
                                  }
                                  </Field>
                             </FormControlLabel>
                        )
                        :(
                          <ModalInput
                          name={item.name}
                          label={item.label}
                          key={item.name}/>
                        );
                    })}

                    <Stack
                     direction="row" justifyContent="space-between">
                      <Button type='submit' variant='contained' size="larg">
                        {title} {/* can be any name of one of the pages (add or edit category) */}
                      </Button>
                     <Button variant='contained' color="error" size="large" onClick={handleClose}>
                      Cancel
                     </Button>
                    </Stack>
                  </form>
            </Formik>
           </Box> 
    </Modal>
  )
};
FormModal.propTypes = {
  open: PropTypes.bool,
  initialValues: PropTypes.object,
  handleSubmit: PropTypes.func,
  handleClose: PropTypes.func,
  inputLabels: PropTypes.array,
  title: PropTypes.string,
  arrayData: PropTypes.object,
};

export default FormModal;

/* object styled is anew idea here,we make style in external file and put it in sx for the element */
