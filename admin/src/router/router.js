import Banner from '../screens/Banner/Banner';
import Categories from '../screens/Categories/Categories';
import Dashboard from '../screens/Dashboard/Dashboard';
import Login from '../screens/LoginScreen';
import NotFound from '../screens/NotFound';
import OrderDetail from '../screens/OrderDetail/OrderDetail';
import OrderDetailScreen from '../screens/OrderDetailScreen';
import OrdersScreen from '../screens/Orders/OrdersScreen';

import Products from '../screens/Products/Products';
import AddProduct from '../screens/Products/components/AddProduct/AddProduct';
import EditProduct from '../screens/Products/components/EditProduct/EditProduct';
import UsersScreen from '../screens/UsersScreen';
import Voucher from '../screens/Voucher/Voucher';

import AddVoucher from '../screens/Voucher/components/AddVoucher/AddVoucher';

const privateRouter = [
  {
    name: 'Trang chủ',
    path: '/',
    component: <Dashboard />,
    exact: true,
  },
  {
    name: 'Danh sách sản phẩm',
    path: '/products',
    component: <Products />,
    exact: true,
  },
  {
    name: 'Chỉnh sửa sản phẩm',
    path: '/products/:id/edit',
    component: <EditProduct />,
    exact: true,
  },
  {
    name: 'Thêm sản phẩm',

    path: '/products/add',
    component: <AddProduct />,
    exact: true,
  },
  {
    name: 'Danh sách đơn hàng',
    path: '/orders',
    component: <OrdersScreen />,
    exact: true,
  },
  {
    breadcrumbs: false,
    name: 'Chi tiết đơn hàng',
    path: '/orders/:orderId',
    component: <OrderDetail />,
    exact: true,
  },
  {
    path: '/users',
    component: <UsersScreen />,
    exact: true,
  },
  {
    name: 'Danh sách thể loại',
    path: '/categories',
    component: <Categories />,
    exact: true,
  },
  {
    name: 'Danh sách banner',

    path: '/banners',
    component: <Banner />,
    exact: true,
  },
  {
    name: 'Danh sách voucher',

    path: '/vouchers',
    component: <Voucher />,
    exact: true,
  },
  {
    name: 'Thêm vouchers',

    path: '/vouchers/add',
    component: <AddVoucher />,
    exact: true,
  },
  {
    name: 'Chỉnh sửa vouchers',

    path: '/vouchers/:id/edit',
    component: <AddVoucher />,
    exact: true,
  },
  {
    path: '*',
    component: <NotFound />,
    exact: true,
  },
];

const publicRouter = [
  {
    name: 'Đăng nhập',
    path: '/login',
    component: <Login />,
    exact: true,
  },
];

export { privateRouter, publicRouter };
