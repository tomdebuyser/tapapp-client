import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import slash from '../../_assets/images/slash-white.png';
import { translations } from '../../_translations';
import { authActions } from '../../_store/actions';
import { Icon } from '..';
import './menu.scss';

const Menu = () => {
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(new authActions.Logout());
  };

  return (
    <header className="main-menu">
      <NavLink to="/">
        <img alt="Silvernext" src={slash} />
      </NavLink>
      <nav>
        <NavLink to="/users">{translations.getLabel('SHARED.NAVIGATION.USERS')}</NavLink>
        <NavLink to="/roles">{translations.getLabel('SHARED.NAVIGATION.ROLES')}</NavLink>
      </nav>
      <Icon label={translations.getLabel('AUTH.LOGOUT')} name="SvgLogout" onClick={logout} size={1.6} />
    </header>
  );
};

export default Menu;
