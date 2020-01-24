import React from 'react';
import { Switch, Redirect, Route, NavLink } from 'react-router-dom';
import Auth from '../../auth/Auth';
import slash from '../../_assets/images/slash-white.png';
import './unauthorizedLayout.scss';

const UnauthorizedLayout: React.FC = () => {
  return (
    <div className="unauthorized-layout">
      <aside>
        <NavLink to="/">
          <img alt="Silvernext" src={slash} />
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
