import CartScreen from '~/screens/CartScreen';
import ConfirmRegister from '~/screens/ConfirmRegister';
import ForgotPass from '~/screens/ForgotPass';
import HomeScreen from '~/screens/HomeScreen';
import Login from '~/screens/Login';
import OrderScreen from '~/screens/OrderScreen';
import PaymentScreen from '~/screens/PaymentScreen';
import PlaceOrderScreen from '~/screens/PlaceOrderScreen';
import ProfileScreen from '~/screens/ProfileScreen';
import Register from '~/screens/Register';
import ResetPass from '~/screens/ResetPass';
import ShippingScreen from '~/screens/ShippingScreen';
import SingleProduct from '~/screens/SingleProduct';
import TodayProduct from '~/screens/TodayProduct';
import VerifyRegisterSuccess from '~/screens/VerifyRegisterSuccess';

export const privateRouter = [
    {
        path: '/profile',
        name: 'home',
        icon: 'smile',
        component: ProfileScreen,
    },
    {
        path: '/shipping',
        component: ShippingScreen,
        name: 'home',
    },
    {
        path: '/payment',
        component: PaymentScreen,
        name: 'home',
    },
    {
        path: '/placeorder',
        component: PlaceOrderScreen,
        name: 'home',
    },

    {
        path: '/cart/:id?',
        name: 'Cart',
        icon: 'smile',
        component: CartScreen,
    },

    {
        path: '/order/:id',
        name: 'welcome',
        icon: 'smile',
        component: OrderScreen,
    },
];

export const publicRouter = [
    {
        path: '/',
        component: HomeScreen,
        name: 'home',
        exact: true,
    },
    {
        path: '/today-product',
        component: TodayProduct,
        name: 'home',
        exact: true,
    },
    {
        path: '/search',
        component: HomeScreen,
        name: 'home',
        exact: true,
    },
    {
        path: '/product/:id',
        component: SingleProduct,
        name: 'home',
    },
    {
        path: '/login',
        component: Login,
        name: 'home',
    },
    {
        path: '/register',
        component: Register,
        name: 'home',
        exact: true,
    },
    {
        path: '/register/confirm',
        component: ConfirmRegister,
        name: 'home',
        exact: true,
    },
    {
        path: '/register/verify',
        component: VerifyRegisterSuccess,
        name: 'home',
        exact: true,
    },

    {
        path: '/forgotpassword',
        name: 'welcome',
        icon: 'smile',
        component: ForgotPass,
    },
    {
        path: '/reset',
        name: 'welcome',
        icon: 'smile',
        component: ResetPass,
        exact: true,
    },
];
