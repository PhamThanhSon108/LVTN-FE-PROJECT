import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, useHistory } from 'react-router-dom';

function PrivateRouter({ component: Component, ...rest }) {
  const userLogin = useSelector((state) => state.userLogin);
  const history = useHistory();
  const { userInfo } = userLogin;
  if (!userInfo) {
    history.push('/login');
    return null;
  }
  if (userInfo && userInfo.role === 'admin') {
    return <Route {...rest} component={() => Component} />;
  }
  // return <Route {...rest} component={<Redirect to={'/login'} />} />;
}

export default PrivateRouter;
