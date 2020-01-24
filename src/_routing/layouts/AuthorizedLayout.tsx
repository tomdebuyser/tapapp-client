import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Menu } from '../../_shared';
import Roles from '../../roles/Roles';
import Users from '../../users/Users';
import { profileSelectors } from '../../_store/selectors';
import { hasUsersPermissions, hasRolesPermissions } from '../../profile/_utils';
import Profile from '../../profile/Profile';

const AuthorizedLayout: React.FC = () => {
  const permissions = useSelector(profileSelectors.permissions);
  return (
    <div>
      <Menu />
      <Switch>
        <Route component={Profile} path="/profile" />
        {hasUsersPermissions(permissions) && <Route component={Users} path="/users" />}
        {hasRolesPermissions(permissions) && <Route component={Roles} path="/roles" />}
        <Redirect to="/profile" />
      </Switch>
    </div>
  );
};

export default AuthorizedLayout;
