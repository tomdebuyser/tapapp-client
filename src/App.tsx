import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import AuthorizedRoute from './_routing/AuthorizedRoute';
import AuthorizedLayout from './_routing/AuthorizedLayout';
import UnauthorizedRoute from './_routing/UnauthorizedRoute';
import Login from './auth/Login';
import ResetPassword from './auth/ResetPassword';

const App: React.FC = () => {
  return (
    <Switch>
      <UnauthorizedRoute path="/auth/login" component={Login} />
      <UnauthorizedRoute path="/auth/reset-password/:token" component={ResetPassword} />
      <AuthorizedRoute path="/" component={AuthorizedLayout} />
      <Redirect to="/" />
    </Switch>
  );
};

export default App;
