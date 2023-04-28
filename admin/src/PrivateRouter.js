import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

function PrivateRouter({ component: Component, ...rest }) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  if (userInfo && userInfo.role === 'admin') {
    return <Route {...rest} component={() => Component} />;
  }
  return <Route {...rest} component={<Redirect to={'/login'} />} />;
}

export default PrivateRouter;
