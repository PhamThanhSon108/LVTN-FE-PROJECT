import CartScreen from '~/pages/Cart/CartScreen';
import ConfirmRegister from '~/pages/ConfirmRegister';
import ForgotPass from '~/pages/ForgotPass';
import HomeScreen from '~/pages/HomeScreen/HomeScreen';
import Login from '~/pages/Login';
import NotFound from '~/pages/NotFound';
import OrderScreen from '~/pages/OrderScreen';
import PaymentScreen from '~/pages/PaymentScreen';
import PlaceOrderScreen from '~/pages/PlaceOrder/PlaceOrderScreen';
import ProfileScreen from '~/pages/Profile/ProfileScreen';
import Register from '~/pages/Register';
import ResetPass from '~/pages/ResetPass';
import ShippingScreen from '~/pages/ShippingScreen';
import SingleProduct from '~/pages/SingleProduct/SingleProduct';
import TodayProduct from '~/pages/TodayProduct';
import VerifyRegisterSuccess from '~/pages/VerifyRegisterSuccess';

const publicRouter = [
    {
        name: 'Trang chủ',
        path: '/',
        component: <HomeScreen />,
        exact: true,
    },
    {
        name: 'Sản phẩm hôm nay',
        path: '/today-product',
        component: <TodayProduct />,
        exact: true,
    },
    {
        name: 'Tìm kiếm',
        path: '/search',
        component: <HomeScreen />,
        exact: true,
    },
    {
        name: 'Chi tiết sản phẩm',

        path: '/product/:id',
        component: <SingleProduct />,
        exact: true,
    },
    {
        path: '/login',
        component: <Login />,
        exact: true,
    },
    {
        path: '/register',
        component: <Register />,
        exact: true,
    },
    {
        name: 'Đăng ký',
        path: '/register/confirm',
        component: <ConfirmRegister />,
        exact: true,
    },
    {
        name: 'Đăng ký',
        path: '/register/verify',
        component: <VerifyRegisterSuccess />,
        exact: true,
    },
    {
        name: 'Quên mật khẩu',
        path: '/forgotpassword',
        component: <ForgotPass />,
        exact: true,
    },
    {
        name: 'Cập nhật mật khẩu',
        path: '/reset',
        component: <ResetPass />,
        exact: true,
    },
    {
        name: 'Không tìm thấy',
        path: '*',
        component: <NotFound />,
        exact: true,
    },
];

const privateRouter = [
    {
        name: 'Thông tin tài khoản',
        path: '/profile',
        component: <ProfileScreen />,
        exact: true,
    },
    {
        name: 'Giỏ hàng',
        path: '/cart',
        component: <CartScreen />,
        exact: true,
    },
    {
        name: 'Giao hàng',
        path: '/shipping',
        component: <ShippingScreen />,
        exact: true,
    },
    {
        name: 'Phương thức thanh toán',
        path: '/payment',
        component: <PaymentScreen />,
        exact: true,
    },
    {
        name: 'Đơn hàng',
        path: '/placeorder',
        component: <PlaceOrderScreen />,
        exact: true,
    },
    {
        name: 'Xem đơn',
        path: '/order/:id',
        component: <OrderScreen />,
        exact: true,
    },
];

export { privateRouter, publicRouter };
