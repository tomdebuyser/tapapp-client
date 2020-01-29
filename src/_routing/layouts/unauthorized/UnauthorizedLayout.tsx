import React from 'react';
import { Switch, Redirect, Route, NavLink } from 'react-router-dom';
import Auth from '../../../auth/Auth';
import './unauthorizedLayout.scss';
import { SvgLogo } from '../../../_assets/svg';

const UnauthorizedLayout: React.FC = () => {
  return (
    <div className="unauthorized-layout">
      <aside>
        <NavLink to="/">
          <SvgLogo />
          <span>Admin portal</span>
        </NavLink>
      </aside>
      <Switch>
        <Route component={Auth} path="/auth" />
        <Redirect to="/auth" />
      </Switch>
    </div>
  );
};

export default UnauthorizedLayout;
