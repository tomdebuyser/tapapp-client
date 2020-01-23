import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import CreateUser from '../users/create/CreateUser';
import UserDetail from '../users/detail/UserDetail';
import UsersOverview from '../users/overview/UsersOverview';

const Users: React.FC = () => {
  const { url } = useRouteMatch();
  return (
    <Switch>
      <Route component={UsersOverview} exact path={url} />
      <Route component={CreateUser} exact path={`${url}/create`} />
      <Route component={UserDetail} exact path={`${url}/:id`} />
    </Switch>
  );
};

export default Users;
