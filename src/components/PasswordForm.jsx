import { TextField } from '@mui/material';
import { Field } from 'formik';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { InputAdornment } from '@mui/material';
import { IconButton } from '@mui/material';
import  PropTypes  from 'prop-types';

const PasswordForm = ({ name, label, errors, touched }) => {
    
  const [showPassword, setShowPassword] = useState(false)
  return (
    <Field
      as={TextField}
      type={showPassword ? 'text' : 'password'} /* here i toggle ,show or hid thpassword */
      name={name}
      fullWidth
      label={label}
      required
      margin="dense"
      error={Boolean(errors[name]) && touched[name]}
      helperText={touched[name] ? errors[name] : ''}
      width="80%"
/* toggle between the  */
InputProps={{
      // we need to decide where to put the icon, start or end
    endAdornment:(      /* to use endadorment component  we shoud use InputProps */
      <InputAdornment position="end">
        <IconButton
          aria-label="toggle password visibility"
          onClick={() => setShowPassword(!showPassword)}   /* to toggle the btn with toggle the password visibility */
          edge="end"
        >
            {/* depending on the value of the state we will display an Icon */}
          {showPassword ? <VisibilityOff /> : <Visibility />}  {/* when eye opern the password hide , colse eye the password text :visible */}
        </IconButton>
      </InputAdornment>
  )
  }}

    />
  );
};

PasswordForm.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
};

export default PasswordForm;
/* error.name 
errorr[name]  dynamic,why 
acces any attribute with variable*/