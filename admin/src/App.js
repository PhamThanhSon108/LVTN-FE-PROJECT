import React from 'react';
import './App.css';
import './responsive.css';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRouter from './PrivateRouter';

import { privateRouter, publicRouter } from './router/router';
import DefaultLayout from './layout/DefaultLayout';
import './assets/css/spacing.scss';
import './assets/css/color.scss';

function App() {
  return (
    <>
      <Router>
        <Switch>
          {publicRouter.map((option) => {
            const Component = option.component;
            return <Route key={option.path} {...option} component={() => Component} />;
          })}

          {privateRouter.map((option) => (
            <PrivateRouter
              key={option.path}
              {...option}
              component={<DefaultLayout name={option.name || 'Admin'}>{option.component}</DefaultLayout>}
            />
          ))}
        </Switch>
      </Router>
    </>
  );
}

export default App;
