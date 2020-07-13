import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { translations } from '../../_translations';
import { Button } from '../../_shared';
import { orderActions } from '../../_store/actions';
import { IOrder } from '../../order/_models';
import OrdersUnfinishedList from './list/OrdersUnfinishedList';
import './ordersUnfinished.scss';

const OrdersUnfinished: FC = () => {
  const dispatch = useDispatch();
  return (
    <div className="orders-unfinished">
      <div className="sidebar sidebar-orders-unfinished">
        <div className="explanation">
          <p>{translations.getLabel('ORDERS.UNFINISHED.SIDEBAR.CHECKOUT_ASAP')}</p>
        </div>
        <div className="bottom">
          <Button onClick={() => dispatch(new orderActions.ClearState())} primary>
            {translations.getLabel('ORDER.FINISHED.BUTTON')}
          </Button>
        </div>
      </div>
      <div className="container">
        <h1>{translations.getLabel('ORDERS.UNFINISHED.TITLE')}</h1>
        <span>{translations.getLabel('ORDERS.UNFINISHED.EXPLANATION')}</span>
        <div className="content">
          <OrdersUnfinishedList
            renderButton={(order: IOrder) => (
              <Button onClick={() => dispatch(new orderActions.GetOrder({ isUnfinished: true, orderId: order.id }))}>
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
