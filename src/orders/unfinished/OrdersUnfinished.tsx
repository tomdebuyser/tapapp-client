import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { translations } from '../../_translations';
import { Button } from '../../_shared';
import { orderActions } from '../../_store/actions';
import OrdersUnfinishedList from './list/OrdersUnfinishedList';
import './ordersUnfinished.scss';

const OrdersUnfinished: FC = () => {
  const dispatch = useDispatch();
  return (
    <div className="orders-unfinished">
      <div className="sidebar" />
      <div className="container">
        <h1>{translations.getLabel('ORDERS.UNFINISHED.TITLE')}</h1>
        <span>{translations.getLabel('ORDERS.UNFINISHED.EXPLANATION')}</span>
        <div className="content">
          <OrdersUnfinishedList
            renderButton={(orderId: string) => (
              <Button onClick={() => dispatch(new orderActions.GetOrder({ orderId }))}>
                {translations.getLabel('ORDERS.UNFINISHED.ITEM.BUTTON_CHECKOUT')}
              </Button>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default OrdersUnfinished;
