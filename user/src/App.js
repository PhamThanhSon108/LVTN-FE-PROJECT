import React, { Suspense } from 'react';
import './App.css';
import './responsive.css';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomeScreen from './pages/HomeScreen/HomeScreen';
import SingleProduct from './pages/SingleProduct/SingleProduct';
import CartScreen from './pages/Cart/CartScreen';
import Login from './pages/Login';
import Register from './pages/Register';
import ShippingScreen from './pages/ShippingScreen';
import ProfileScreen from './pages/Profile/ProfileScreen';
import PaymentScreen from './pages/PaymentScreen';
import PlaceOrderScreen from './pages/PlaceOrder/PlaceOrderScreen';
import OrderScreen from './pages/OrderScreen';
import NotFound from './pages/NotFound';
import PrivateRouter from './PrivateRouter';
import ConfirmRegister from './pages/ConfirmRegister';
import VerifyRegisterSuccess from './pages/VerifyRegisterSuccess';
import ForgotPass from './pages/ForgotPass';
import ResetPass from './pages/ResetPass';
import TodayProduct from './pages/TodayProduct';

// const HomeScreen = React.lazy(() => import('./screens/HomeScreen'));
// const SingleProduct = React.lazy(() => import('./screens/SingleProduct'));
// const CartScreen = React.lazy(() => import('./screens/CartScreen'));
// const Register = React.lazy(() => import('./screens/Register'));
// const Login = React.lazy(() => import('./screens/Login'));
// const ShippingScreen = React.lazy(() => import('./screens/ShippingScreen'));
// const ProfileScreen = React.lazy(() => import('./screens/ProfileScreen'));
// const PaymentScreen = React.lazy(() => import('./screens/PaymentScreen'));

// const PlaceOrderScreen = React.lazy(() => import('./screens/PlaceOrderScreen'));
// const OrderScreen = React.lazy(() => import('./screens/OrderScreen'));
// const NotFound = React.lazy(() => import('./screens/NotFound'));

// const ResetPass = React.lazy(() => import('./screens/ResetPass'));
// const ForgotPass = React.lazy(() => import('./screens/ForgotPass'));
// const VerifyRegisterSuccess = React.lazy(() => import('./screens/VerifyRegisterSuccess'));
// const ConfirmRegister = React.lazy(() => import('./screens/ConfirmRegister'));
const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" component={HomeScreen} exact />
                <Route path="/today-product" component={TodayProduct} exact />
                {/* <Suspense fallback={'Loading...'}> */}
                {/* <Route path="/category/:category" component={HomeScreen} exact /> */}
                {/* <Route path="/page/:pageNumber" component={HomeScreen} exact /> */}
                {/* <Route path="/category/:category/page/:pageNumber" component={HomeScreen} exact /> */}

                {/* <Route path="/search/:keyword" component={HomeScreen} exact />
                <Route path="/search/:keyword/page/:pageNumber" component={HomeScreen} exact /> */}

                <Route path="/search" component={HomeScreen} exact />
                <Route path="/product/:id" component={SingleProduct} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} exact />
                <Route path="/register/confirm" component={ConfirmRegister} exact />
                <Route path="/register/verify" component={VerifyRegisterSuccess} exact />
                <PrivateRouter path="/profile" component={ProfileScreen} />
                <PrivateRouter path="/cart/:id?" component={CartScreen} />
                <PrivateRouter path="/shipping" component={ShippingScreen} />
                <PrivateRouter path="/payment" component={PaymentScreen} />
                <PrivateRouter path="/placeorder" component={PlaceOrderScreen} />
                <PrivateRouter path="/order/:id" component={OrderScreen} />
                <Route path="/forgotpassword" component={ForgotPass} />
                <Route path="/reset" component={ResetPass} exact />

                <Route path="*" component={NotFound} />
                {/* </Suspense> */}
            </Switch>
        </Router>
    );
};

export default App;
