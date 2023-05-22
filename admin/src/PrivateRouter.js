import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, useHistory } from 'react-router-dom';
function PrivateRouter({ component: Component, ...rest }) {
  const token = window.localStorage.getItem('userInfo');
  const history = useHistory();

  if (!token) {
    localStorage.removeItem('userInfo');
    history.push('/login');
    return null;
  }
  if (token) {
    return <Route {...rest} component={() => Component} />;
  }
}

export default PrivateRouter;
