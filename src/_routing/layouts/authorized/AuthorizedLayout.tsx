import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Order from '../../../order/Order';
import AuthorizedLayoutMenu from './menu/AuthorizedLayoutMenu';
import './authorizedLayout.scss';

const AuthorizedLayout: React.FC = () => {
  return (
    <div className="authorized-layout">
      <AuthorizedLayoutMenu />
      <Switch>
        <Route component={Order} path="/order" />
        <Redirect to="/order" />
      </Switch>
    </div>
  );
};

export default AuthorizedLayout;
