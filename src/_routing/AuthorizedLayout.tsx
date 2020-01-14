import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Menu } from '../_shared';
import Users from '../users/Users';
import CreateUser from '../users/createUser/CreateUser';
import Roles from '../roles/Roles';
import CreateRole from '../roles/createRole/CreateRole';

const AuthorizedLayout: React.FC = () => {
  return (
    <div className="App">
      <Menu />
      <Switch>
        <Route exact path="/users" component={Users} />
        <Route exact path="/users/create" component={CreateUser} />
        <Route exact path="/roles" component={Roles} />
        <Route exact path="/roles/create" component={CreateRole} />
        <Redirect to="/users" />
      </Switch>
    </div>
  );
};

export default AuthorizedLayout;
