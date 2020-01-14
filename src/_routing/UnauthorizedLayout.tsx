import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import Login from '../auth/Login';
import ResetPassword from '../auth/ResetPassword';
import slash from '../_assets/images/slash-white.png';

import './unauthorizedLayout.scss';

const UnauthorizedLayout: React.FC = () => {
  return (
    <div className="auth">
      <aside>
        <img src={slash} alt="Silvernext" />
      </aside>
      <Switch>
        <Route path="/auth/login" component={Login} />
        <Route path="/auth/reset-password/:token" component={ResetPassword} />
        <Redirect to="/auth/login" />
      </Switch>
    </div>
  );
};

export default UnauthorizedLayout;
