import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import LoginRegisterComponent from '../components/LoginRegisterComponent';
import PasswordForm from '../components/PasswordForm';
import { login} from '../store/authSlice';

const Login = () => {
  const inputLabels = [
    { name: 'email', label: 'Email', Component: InputForm },
    { name: 'password', label: 'Password', Component: PasswordForm },
  ];

  const initialValues = {
    password: '',
    email: '',
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    // e.preventDefault();
    // actions.setSubmitting(false);
    console.log(values);
    dispatch(login(values, navigate));
    // reset the form after submitting
    actions.resetForm();
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      /* .min(8, 'Password must be at least 8 characters')
      .max(20, 'Password must be at most 20 characters')
      .matches(/[A-Z]+/, 'Password must contain at least one uppercase letter')
      .matches(/[a-z]+/, 'Password must contain at least one lowercase letter')
      .matches(/[0-9]+/, 'Password must contain at least one number')
      .matches(
        /[^A-Za-z0-9]+/,
        'Password must contain at least one special character'
      )    i dont need here in login */
      .required('Password is required'),
  });

  return (
    <LoginRegisterComponent
      initialValues={initialValues}
      validationSchema={validationSchema}
      handleSubmit={handleSubmit}
      inputLabels={inputLabels}
      pageName="Login"
      navigateText="Don't have an account? Register"
      navigateTo="/register"
    />
  );
};

export default Login;
