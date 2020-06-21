import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { Button } from '../../../_shared';
import { orderActions } from '../../../_store/actions';
import { PaymentType } from '../../_models';
import { translations } from '../../../_translations';
import Calculator from './calculator/Calculator';

type Props = {};

const OrderCheckoutCash: FC<Props> = () => {
  const dispatch = useDispatch();

  return (
    <div className="order-checkout-cash">
      <div className="container">
        <h1>{translations.getLabel('ORDER.CHECKOUT.CASH.TITLE')}</h1>
        <span>{translations.getLabel('ORDER.CHECKOUT.CASH.EXPLANATION')}</span>
        <div className="content">
          <Calculator />
          <div className="buttons-wrapper">
            <Button onClick={() => dispatch(new orderActions.PayOrder({ paymentType: PaymentType.Cash }))} primary>
              {translations.getLabel('ORDER.CHECKOUT.CASH.BUTTON_PAY')}
            </Button>
            <Button negative onClick={() => dispatch(push('/order/checkout'))}>
              {translations.getLabel('ORDER.CHECKOUT.CASH.BUTTON_STOP')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCheckoutCash;
