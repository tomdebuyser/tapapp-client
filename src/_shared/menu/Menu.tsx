import React from 'react';
import { NavLink } from 'react-router-dom';
import slash from '../../_assets/images/slash-white.png';
import { translations } from '../../_translations';
import './menu.scss';

const Menu = () => {
  return (
    <header className="main-menu">
      <img src={slash} alt="Silvernext" />
      <nav>
        <NavLink to={'/users'}>{translations.getLabel('NAVIGATION.USERS')}</NavLink>
      </nav>
    </header>
  );
};

export default Menu;
