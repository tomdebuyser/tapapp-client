import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SidebarCheckout from '../checkout/sidebar/SidebarCheckout';
import { Icon, Button } from '../../_shared';
import { orderActions } from '../../_store/actions';
import { orderSelectors } from '../../_store/selectors';
import { translations } from '../../_translations';
import './orderFinished.scss';

const OrderFinished: FC = () => {
  const dispatch = useDispatch();
  const orderId = useSelector(orderSelectors.orderId);

  if (!orderId) {
    dispatch(new orderActions.ClearState());
  }

  return (
    <div className="order-finished">
      <SidebarCheckout readonly />
      <div className="container">
        <Icon name="SvgSuccess" size={7.5} />
        <div className="text">{translations.getLabel('ORDER.FINISHED.ORDER_PAID')}</div>
        <Button onClick={() => dispatch(new orderActions.ClearState())} primary>
          {translations.getLabel('ORDER.FINISHED.BUTTON')}
        </Button>
      </div>
    </div>
  );
};

export default OrderFinished;
