import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { Button } from '../../../_shared';
import { orderActions } from '../../../_store/actions';
import { PaymentType } from '../../_models';
import { I18n } from '../../../_translations';
import Calculator from './calculator/Calculator';

const OrderCheckoutCash: FC = () => {
  const dispatch = useDispatch();

  return (
    <div className="order-checkout-cash">
      <div className="container">
        <h1>{I18n.labels.ORDER.CHECKOUT.CASH.TITLE}</h1>
        <span>{I18n.labels.ORDER.CHECKOUT.CASH.EXPLANATION}</span>
        <div className="content">
          <Calculator />
          <div className="buttons-wrapper">
            <Button onClick={() => dispatch(new orderActions.PayOrder({ paymentType: PaymentType.Cash }))} primary>
              {I18n.labels.ORDER.CHECKOUT.CASH.BUTTON_PAY}
            </Button>
            <Button negative onClick={() => dispatch(push('/order/checkout'))}>
              {I18n.labels.ORDER.CHECKOUT.CASH.BUTTON_STOP}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCheckoutCash;
