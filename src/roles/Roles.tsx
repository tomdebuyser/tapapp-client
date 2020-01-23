import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import RolesOverview from './overview/RolesOverview';
import CreateRole from './createRole/CreateRole';

const Roles: React.FC = () => {
  const { url } = useRouteMatch();
  return (
    <Switch>
      <Route component={RolesOverview} exact path={url} />
      <Route component={CreateRole} exact path={`${url}/create`} />
    </Switch>
  );
};

export default Roles;
