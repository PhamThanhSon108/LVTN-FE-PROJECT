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
import './assets/css/color.scss';
import './assets/css/spacing.scss';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" component={HomeScreen} exact />
                <Route path="/today-product" component={TodayProduct} exact />
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
