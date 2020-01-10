import React from 'react';
import { NavLink } from 'react-router-dom';
import slash from '../../_assets/images/slash-white.png';
import { translations } from '../../_translations';
import './menu.scss';

const Menu = () => {
  return (
    <header className="main-menu">
      <NavLink to="/">
        <img src={slash} alt="Silvernext" />
      </NavLink>
      <nav>
        <NavLink to="/users">{translations.getLabel('NAVIGATION.USERS')}</NavLink>
        <NavLink to="/roles">{translations.getLabel('NAVIGATION.ROLES')}</NavLink>
      </nav>
    </header>
  );
};

export default Menu;
