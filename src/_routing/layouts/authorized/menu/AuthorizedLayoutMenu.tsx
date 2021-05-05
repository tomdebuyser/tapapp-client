import React, { FC } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { profileSelectors, orderSelectors } from '../../../../_store/selectors';
import { SvgLogo } from '../../../../_assets/svg';
import { Icon } from '../../../../_shared';
import './authorizedLayoutMenu.scss';
import { I18n } from '../../../../_translations';

const AuthorizedLayoutMenu: FC = () => {
  const profile = useSelector(profileSelectors.profile);
  const orderId = useSelector(orderSelectors.orderId);
  const isUnfinishedOrder = useSelector(orderSelectors.isUnfinishedOrder);
  const { pathname } = useLocation();

  function shouldShowUnfinishedOrdersTab(): boolean {
    // TODO: Implement merge order
    return false;
    if (!orderId) return true;
    if (pathname === '/order/checkout') return isUnfinishedOrder;
    return false;
  }

  return (
    <>
      <div className="menu-logo">
        <SvgLogo />
      </div>
      <header className="main-menu">
        <nav>
          {shouldShowUnfinishedOrdersTab() && (
            <div>
              <NavLink to="/orders/unfinished">
                <Icon name="SvgBill" size={2.5} />
                <span>{I18n.labels.SHARED.NAVIGATION.UNFINISHED_ORDERS}</span>
              </NavLink>
            </div>
          )}
        </nav>
        <div className="profile">
          <span>{profile.organisation.name}</span>
        </div>
        {/* <Icon
          label={I18n.labels.AUTH.LOGOUT}
          name="SvgLogout"
          onClick={() => dispatch(new authActions.Logout())}
          size={1.6}
        /> */}
      </header>
    </>
  );
};

export default AuthorizedLayoutMenu;
