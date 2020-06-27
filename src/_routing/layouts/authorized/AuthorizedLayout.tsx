import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Order from '../../../order/Order';
import Orders from '../../../orders/Orders';
import AuthorizedLayoutMenu from './menu/AuthorizedLayoutMenu';
import './authorizedLayout.scss';

const AuthorizedLayout: React.FC = () => {
  return (
    <div className="authorized-layout">
      <AuthorizedLayoutMenu />
      <Switch>
        <Route component={Order} path="/order" />
        <Route component={Orders} path="/orders" />
        <Redirect to="/order" />
      </Switch>
    </div>
  );
};

export default AuthorizedLayout;
