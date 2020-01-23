import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Menu } from '../../_shared';
import Roles from '../../roles/Roles';
import Users from '../../users/Users';

const AuthorizedLayout: React.FC = () => {
  return (
    <div>
      <Menu />
      <Switch>
        <Route component={Users} path="/users" />
        <Route component={Roles} path="/roles" />
        <Redirect to="/users" />
      </Switch>
    </div>
  );
};

export default AuthorizedLayout;
