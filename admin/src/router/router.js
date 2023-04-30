import AddProduct from '../screens/AddProduct';
import CategoriesScreen from '../screens/CategoriesScreen';
import HomeScreen from '../screens/HomeScreen';
import Login from '../screens/LoginScreen';
import NotFound from '../screens/NotFound';
import OrderDetailScreen from '../screens/OrderDetailScreen';
import OrderScreen from '../screens/OrderScreen';
import ProductEditScreen from '../screens/ProductEditScreen';
import ProductScreen from '../screens/ProductScreen';
import SliderScreen from '../screens/SliderScreen';
import UsersScreen from '../screens/UsersScreen';
import Voucher from '../screens/Voucher/Voucher';

import AddVoucher from '../screens/Voucher/components/AddVoucher/AddVoucher';

const privateRouter = [
  {
    path: '/',
    component: <HomeScreen />,
    exact: true,
  },
  {
    path: '/products',
    component: <ProductScreen />,
    exact: true,
  },
  {
    path: '/products/:id/edit',
    component: <ProductEditScreen />,
    exact: true,
  },
  {
    path: '/products/add',
    component: <AddProduct />,
    exact: true,
  },
  {
    path: '/orders',
    component: <OrderScreen />,
    exact: true,
  },
  {
    path: '/orders/:orderId',
    component: <OrderDetailScreen />,
    exact: true,
  },
  {
    path: '/users',
    component: <UsersScreen />,
    exact: true,
  },
  {
    path: '/categories',
    component: <CategoriesScreen />,
    exact: true,
  },
  {
    path: '/sliders',
    component: <SliderScreen />,
    exact: true,
  },
  {
    path: '/vouchers',
    component: <Voucher />,
    exact: true,
  },
  {
    path: '/vouchers/add',
    component: <AddVoucher />,
    exact: true,
  },
];

const publicRouter = [
  {
    path: '/login',
    component: <Login />,
    exact: true,
  },
  {
    path: '*',
    component: <NotFound />,
    exact: true,
  },
];

export { privateRouter, publicRouter };
