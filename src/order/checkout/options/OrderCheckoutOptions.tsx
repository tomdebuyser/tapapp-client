import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import { translations } from '../../../_translations';
import { SvgPayconiq } from '../../../_assets/svg';
import { orderActions } from '../../../_store/actions';
import { PaymentType } from '../../_models';
import ButtonCheckout from './buttonCheckout/ButtonCheckout';

const OrderCheckoutOptions: FC = () => {
  const { url } = useRouteMatch();
  const dispatch = useDispatch();

  return (
    <div className="container">
      <h1>{translations.getLabel('ORDER.CHECKOUT.TITLE')}</h1>
      <div className="buttons">
        <Link to={`${url}/cash`}>
          <ButtonCheckout icon="SvgCash" label={translations.getLabel('ORDER.CHECKOUT.PAYMENT_TYPES.CASH')} />
        </Link>
        <Link to={`${url}/payconiq`}>
          <ButtonCheckout
            icon="SvgSmartphone"
            label={translations.getLabel('ORDER.CHECKOUT.PAYMENT_TYPES.SMARTPHONE')}
            logo={<SvgPayconiq />}
          />
        </Link>
        <Link to={`${url}/merge`}>
          <ButtonCheckout icon="SvgBill" label={translations.getLabel('ORDER.CHECKOUT.PAYMENT_TYPES.MERGE')} />
        </Link>
        <ButtonCheckout
          icon="SvgFree"
          label={translations.getLabel('ORDER.CHECKOUT.PAYMENT_TYPES.FREE')}
          onClick={() => dispatch(new orderActions.PayOrder({ paymentType: PaymentType.Free }))}
        />
      </div>
    </div>
  );
};

export default OrderCheckoutOptions;
