
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'react-toastify/dist/ReactToastify.css';  /* when i use toastify i have to import this line */
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@mui/material';/* this line remove all the margin and padding in my app like(* {margin:0,padding:0, box-sizing:border-box}) */
import { ToastContainer } from 'react-toastify';
import {store} from "./store/store.js"
import { Provider } from 'react-redux';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Provider store={store}>
    <CssBaseline />
    <App />
    <ToastContainer />
  </Provider>
</BrowserRouter>
)
