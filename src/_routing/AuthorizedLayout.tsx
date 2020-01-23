import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Menu } from '../_shared';
import CreateRole from '../roles/createRole/CreateRole';
import CreateUser from '../users/create/CreateUser';
import Roles from '../roles/Roles';
import UserDetail from '../users/detail/UserDetail';
import Users from '../users/Users';

const AuthorizedLayout: React.FC = () => {
  return (
    <div className="App">
      <Menu />
      <Switch>
        <Route component={Users} exact path="/users" />
        <Route component={CreateUser} exact path="/users/create" />
        <Route component={UserDetail} exact path="/users/:id" />
        <Route component={Roles} exact path="/roles" />
        <Route component={CreateRole} exact path="/roles/create" />
        <Redirect to="/users" />
      </Switch>
    </div>
  );
};

export default AuthorizedLayout;
