import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import Login from '../auth/Login';
import ChoosePassword from '../auth/ChoosePassword';
import slash from '../_assets/images/slash-white.png';
import RequestPasswordReset from '../auth/RequestPasswordReset';
import './unauthorizedLayout.scss';

const UnauthorizedLayout: React.FC = () => {
  return (
    <div className="auth">
      <aside>
        <img alt="Silvernext" src={slash} />
      </aside>
      <Switch>
        <Route component={Login} path="/auth/login" />
        <Route component={ChoosePassword} path="/auth/register/:token" />
        <Route path="/auth/choose-password/:token" render={() => <ChoosePassword isPasswordReset />} />
        <Route component={RequestPasswordReset} path="/auth/request-password-reset" />
        <Redirect to="/auth/login" />
      </Switch>
    </div>
  );
};

export default UnauthorizedLayout;
