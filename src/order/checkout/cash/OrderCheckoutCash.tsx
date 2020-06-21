import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { Button } from '../../../_shared';
import { orderActions } from '../../../_store/actions';
import { PaymentType } from '../../_models';
import Calculator from './calculator/Calculator';

type Props = {};

const OrderCheckoutCash: FC<Props> = () => {
  const dispatch = useDispatch();

  return (
    <div className="order-checkout-cash">
      <div className="container">
        <h1>Cash betalen</h1>
        <span>Ontvang het geld en steek het in de kassa</span>
        <div className="content">
          <Calculator />
          <div className="buttons-wrapper">
            <Button onClick={() => dispatch(new orderActions.PayOrder({ paymentType: PaymentType.Cash }))} primary>
              Betaling ontvangen
            </Button>
            <Button negative onClick={() => dispatch(push('/order/checkout'))}>
              Betaling stoppen
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCheckoutCash;
