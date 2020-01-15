import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Menu } from '../_shared';
import CreateRole from '../roles/createRole/CreateRole';
import CreateUser from '../users/createUser/CreateUser';
import Roles from '../roles/Roles';
import UserDetail from '../users/UserDetail';
import Users from '../users/Users';

const AuthorizedLayout: React.FC = () => {
  return (
    <div className="App">
      <Menu />
      <Switch>
        <Route exact path="/users" component={Users} />
        <Route exact path="/users/create" component={CreateUser} />
        <Route exact path="/users/:id" component={UserDetail} />
        <Route exact path="/roles" component={Roles} />
        <Route exact path="/roles/create" component={CreateRole} />
        <Redirect to="/users" />
      </Switch>
    </div>
  );
};

export default AuthorizedLayout;
