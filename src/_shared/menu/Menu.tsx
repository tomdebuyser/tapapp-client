import React from 'react';
import { NavLink } from 'react-router-dom';
import { translations } from '../../_translations';
import slash from '../../_assets/images/slash-white.png';
import './menu.scss';

const Menu = () => {
  return (
    <header className="main-menu">
      <img src={slash} alt={translations.getLabel('SILVERNEXT')} />
      <nav>
        <NavLink to={'/users'}>{translations.getLabel('USERS')}</NavLink>
      </nav>
    </header>
  );
};

export default Menu;
