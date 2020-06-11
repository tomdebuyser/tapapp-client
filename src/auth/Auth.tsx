import React from 'react';
import { Switch, Redirect, Route, useRouteMatch } from 'react-router-dom';
import Login from './login/Login';
import './auth.scss';

const Auth: React.FC = () => {
  const { url } = useRouteMatch();
  return (
    <div className="auth">
      <Switch>
        <Route component={Login} path={`${url}/login`} />
        <Redirect to={`${url}/login`} />
      </Switch>
    </div>
  );
};

export default Auth;
