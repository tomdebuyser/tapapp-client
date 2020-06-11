import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import Auth from '../../../auth/Auth';
import './unauthorizedLayout.scss';
import { SvgLogo } from '../../../_assets/svg';

export const UNAUTHORIZES_ROUTES = ['/auth'];

const UnauthorizedLayout: React.FC = () => {
  return (
    <div className="unauthorized-layout">
      <SvgLogo className="logo" />
      <Switch>
        <Route component={Auth} path="/auth" />
        <Redirect to="/auth" />
      </Switch>
    </div>
  );
};

export default UnauthorizedLayout;
