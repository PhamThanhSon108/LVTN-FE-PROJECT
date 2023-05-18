import React, { Suspense } from 'react';
import './App.css';
import './responsive.css';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './assets/css/color.scss';
import './assets/css/spacing.scss';
import TodayProduct from './pages/TodayProduct';
import { privateRouter, publicRouter } from './router/router';
import DefaultLayout from './layout/DefaultLayout';
import PrivateRouter from './PrivateRouter';

const App = () => {
    return (
        <Router>
            <Switch>
                {/* <Route path="/" component={HomeScreen} exact />
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

                <Route path="*" component={NotFound} /> */}
                {/* </Suspense> */}

                {privateRouter.map((option) => (
                    <PrivateRouter
                        key={option.path}
                        {...option}
                        component={
                            <DefaultLayout name={option.name || 'Fashionshop'}>{option.component}</DefaultLayout>
                        }
                    />
                ))}
                {publicRouter.map((option) => {
                    const renderComponent = () => (
                        <DefaultLayout name={option.name || 'Fashionshop'}>{option.component}</DefaultLayout>
                    );
                    return <Route key={option.path} {...option} component={renderComponent} />;
                })}
            </Switch>
        </Router>
    );
};

export default App;
