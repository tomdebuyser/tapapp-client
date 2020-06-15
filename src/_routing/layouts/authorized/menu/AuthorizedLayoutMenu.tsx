import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { translations } from '../../../../_translations';
import { authActions } from '../../../../_store/actions';
import { profileSelectors } from '../../../../_store/selectors';
import { SvgLogo } from '../../../../_assets/svg';
import { Icon } from '../../../../_shared';
import './authorizedLayoutMenu.scss';

const AuthorizedLayoutMenu: FC = () => {
  const dispatch = useDispatch();
  const profile = useSelector(profileSelectors.profile);

  return (
    <>
      <NavLink className="logo" to="/">
        <SvgLogo />
      </NavLink>
      <header className="main-menu">
        <nav>
          <div />
          <div className="profile">
            <Icon name="SvgUser" size={2} />
            <span>{profile.organisation.name}</span>
          </div>
        </nav>
        <Icon
          label={translations.getLabel('AUTH.LOGOUT')}
          name="SvgLogout"
          onClick={() => dispatch(new authActions.Logout())}
          size={1.6}
        />
      </header>
    </>
  );
};

export default AuthorizedLayoutMenu;
