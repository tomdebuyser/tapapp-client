import React, { FC } from 'react';
import { useRouteMatch, Switch, Route, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { orderSelectors } from '../../_store/selectors';
import { orderActions } from '../../_store/actions';
import { hasReachedPayconiqLimit } from '../_models/rules';
import SidebarCheckout from './sidebar/SidebarCheckout';
import OrderCheckoutCash from './cash/OrderCheckoutCash';
import OrderCheckoutPayconiq from './payconiq/OrderCheckoutPayconiq';
import OrderCheckoutMerge from './merge/OrderCheckoutMerge';
import OrderCheckoutOptions from './options/OrderCheckoutOptions';
import './orderCheckout.scss';

const OrderCheckout: FC = () => {
  const dispatch = useDispatch();
  const { url } = useRouteMatch();
  const { pathname } = useLocation();
  const orderId = useSelector(orderSelectors.orderId);
  const totalPrice = useSelector(orderSelectors.totalPrice);

  if (!orderId) {
    dispatch(new orderActions.ClearState());
  }

  return (
    <>
      <SidebarCheckout readonly={pathname.split('/order/checkout')[1].length > 0} />
      <div className="order-checkout">
        <Switch>
          <Route component={OrderCheckoutOptions} exact path={`${url}/`} />
          <Route component={OrderCheckoutCash} exact path={`${url}/cash`} />
          {!hasReachedPayconiqLimit(totalPrice) && <Route component={OrderCheckoutPayconiq} exact path={`${url}/payconiq`} />}
          <Route component={OrderCheckoutMerge} exact path={`${url}/merge`} />
        </Switch>
      </div>
    </>
  );
};

export default OrderCheckout;
