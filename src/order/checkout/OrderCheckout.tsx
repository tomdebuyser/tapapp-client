import React, { FC } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { translations } from '../../_translations';
import './orderCheckout.scss';
import { SvgPayconiq } from '../../_assets/svg';
import { orderActions } from '../../_store/actions';
import { PaymentType } from '../_models';
import { orderSelectors } from '../../_store/selectors';
import ButtonCheckout from './button-checkout/ButtonCheckout';
import SidebarCheckout from './sidebar-checkout/SidebarCheckout';

type Props = {};

const OrderCheckout: FC<Props> = () => {
  const { url } = useRouteMatch();
  const dispatch = useDispatch();
  const orderId = useSelector(orderSelectors.orderId);

  if (!orderId) {
    dispatch(new orderActions.ClearState());
  }

  return (
    <div className="order-checkout">
      <SidebarCheckout />
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
    </div>
  );
};

export default OrderCheckout;
