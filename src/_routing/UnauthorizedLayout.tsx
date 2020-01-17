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
        <img src={slash} alt="Silvernext" />
      </aside>
      <Switch>
        <Route path="/auth/login" component={Login} />
        <Route path="/auth/register/:token" component={ChoosePassword} />
        <Route path="/auth/choose-password/:token" render={() => <ChoosePassword isPasswordReset />} />
        <Route path="/auth/request-password-reset" component={RequestPasswordReset} />
        <Redirect to="/auth/login" />
      </Switch>
    </div>
  );
};

export default UnauthorizedLayout;
