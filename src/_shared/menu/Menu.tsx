import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import slash from '../../_assets/images/slash-white.png';
import { translations } from '../../_translations';
import { authActions } from '../../_store/actions';
import { profileSelectors } from '../../_store/selectors';
import { hasUsersPermissions, hasRolesPermissions } from '../../profile/_utils';
import { Icon } from '..';
import './menu.scss';

const Menu: FC = () => {
  const dispatch = useDispatch();
  const permissions = useSelector(profileSelectors.permissions);

  return (
    <header className="main-menu">
      <NavLink to="/">
        <img alt="Silvernext" src={slash} />
      </NavLink>
      <nav>
        {hasUsersPermissions(permissions) && <NavLink to="/users">{translations.getLabel('SHARED.NAVIGATION.USERS')}</NavLink>}
        {hasRolesPermissions(permissions) && <NavLink to="/roles">{translations.getLabel('SHARED.NAVIGATION.ROLES')}</NavLink>}
      </nav>
      <Icon
        label={translations.getLabel('AUTH.LOGOUT')}
        name="SvgLogout"
        onClick={() => dispatch(new authActions.Logout())}
        size={1.6}
      />
    </header>
  );
};

export default Menu;
