import React from 'react';
import { Redirect, Route } from 'react-router-dom';

function PrivateRouter({ component: Component, ...rest }) {
    const token = window.localStorage.getItem('userInfo');
    const renderComponent = () => Component;
    if (token) return <Route {...rest} component={renderComponent} />;

    return <Route {...rest} component={() => <Redirect to={'/login'} />} />;
}
export default PrivateRouter;
