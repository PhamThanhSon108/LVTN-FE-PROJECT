import React, { Suspense } from 'react';
import './App.css';
import './responsive.css';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import SingleProduct from './screens/SingleProduct';
import CartScreen from './screens/CartScreen';
import Login from './screens/Login';
import Register from './screens/Register';
import ShippingScreen from './screens/ShippingScreen';
import ProfileScreen from './screens/ProfileScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import NotFound from './screens/NotFound';
import PrivateRouter from './PrivateRouter';
import ConfirmRegister from './screens/ConfirmRegister';
import VerifyRegisterSuccess from './screens/VerifyRegisterSuccess';
import ForgotPass from './screens/ForgotPass';
import ResetPass from './screens/ResetPass';

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
                {/* <Suspense fallback={'Loading...'}> */}
                <Route path="/" component={HomeScreen} exact />
                <Route path="/search/:keyword" component={HomeScreen} exact />
                <Route path="/category/:category" component={HomeScreen} exact />
                <Route path="/page/:pageNumber" component={HomeScreen} exact />
                <Route path="/search/:keyword/page/:pageNumber" component={HomeScreen} exact />
                <Route path="/category/:category/page/:pageNumber" component={HomeScreen} exact />
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
