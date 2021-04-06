import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import SidebarCheckout from '../checkout/sidebar/SidebarCheckout';
import { Icon, Button } from '../../_shared';
import { orderActions } from '../../_store/actions';
import { orderSelectors } from '../../_store/selectors';
import { I18n } from '../../_translations';
import './orderFinished.scss';

export type IOrderFinishedRouterState = {
  text?: string;
};

const OrderFinished: FC = () => {
  const dispatch = useDispatch();
  const orderId = useSelector(orderSelectors.orderId);
  const { state } = useLocation<IOrderFinishedRouterState>();

  useEffect(() => {
    if (!orderId) dispatch(new orderActions.ClearState());
    return () => dispatch(new orderActions.ClearState());
  });

  return (
    <div className="order-finished">
      <SidebarCheckout readonly />
      <div className="container">
        <Icon name="SvgSuccess" size={7.5} />
        <div className="text">{state?.text || I18n.labels.ORDER.FINISHED.EXPLANATION.ORDER_PAID}</div>
        <Button onClick={() => dispatch(new orderActions.ClearState())} primary>
          {I18n.labels.ORDER.FINISHED.BUTTON}
        </Button>
      </div>
    </div>
  );
};

export default OrderFinished;
