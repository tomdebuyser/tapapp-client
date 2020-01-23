import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import RolesOverview from './overview/RolesOverview';
import CreateRole from './createRole/CreateRole';
import RoleDetail from './detail/RoleDetail';

const Roles: React.FC = () => {
  const { url } = useRouteMatch();
  return (
    <Switch>
      <Route component={RolesOverview} exact path={url} />
      <Route component={CreateRole} exact path={`${url}/create`} />
      <Route component={RoleDetail} exact path={`${url}/:id`} />
    </Switch>
  );
};

export default Roles;
