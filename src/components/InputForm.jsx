import { TextField } from '@mui/material';
import { Field } from 'formik';
import PropTypes from 'prop-types';
const InputForm = ({ name, label, errors, touched }) => {
    // name is a variable and may be eqaul to 'username', 'email', or 'password'
    /* we dont konw what the value of name it change so we acce it dynamic with[] */
  return (
    <Field
      as={TextField}
      name={name}
      fullWidth
      label={label}
      required
      margin="dense"
      error={Boolean(errors[name]) && touched[name]}  /* dynamic value[name],because name is avariable just dynamic way can we accesse variable in the obj */
      helperText={touched[name] ? errors[name] : ''}
    />
  );
};
InputForm.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    errors: PropTypes.object.isRequired,
    touched: PropTypes.object.isRequired,
}/* validation define for props */
/* collect best practieses, we have red line it give me error to provide proptyps */
export default InputForm;
