import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { PieChart } from '@mui/x-charts';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { salesActions } from '../store/sales';
import { brandsActions } from '../store/brands';
import { purchasesActions } from '../store/purchases';
import { firmsActions } from '../store/firms';
import { productsActions } from '../store/products';
import { categoriesActions } from '../store/categories';
import { useSelector } from 'react-redux';
import DashboardTable from '../components/DashboardTable';
import Chart from '../components/Chart';

export default function Dashboard() {
  
  return (
    <div>Dashboard</div>
  )
}
