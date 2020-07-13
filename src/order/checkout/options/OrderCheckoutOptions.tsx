import React, { FC } from 'react';
import classnames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import { translations } from '../../../_translations';
import { SvgPayconiq } from '../../../_assets/svg';
import { orderActions } from '../../../_store/actions';
import { PaymentType } from '../../_models';
import { orderSelectors } from '../../../_store/selectors';
import { hasReachedPayconiqLimit } from '../../_models/rules';
import { Config } from '../../../config';
import ButtonCheckout from './buttonCheckout/ButtonCheckout';
import './orderCheckoutOptions.scss';

const OrderCheckoutOptions: FC = () => {
  const { url } = useRouteMatch();
  const dispatch = useDispatch();
  const isUnfinishedOrder = useSelector(orderSelectors.isUnfinishedOrder);
  const totalPrice = useSelector(orderSelectors.totalPrice);

  return (
    <div className="order-checkout-options container">
      <h1>{translations.getLabel('ORDER.CHECKOUT.TITLE')}</h1>
      <div className="buttons">
        <Link to={`${url}/cash`}>
          <ButtonCheckout icon="SvgCash" label={translations.getLabel('ORDER.CHECKOUT.PAYMENT_TYPES.CASH')} />
        </Link>
        <Link className={classnames({ disabled: hasReachedPayconiqLimit(totalPrice) })} to={`${url}/payconiq`}>
          <ButtonCheckout
            icon="SvgSmartphone"
            label={
              hasReachedPayconiqLimit(totalPrice)
                ? translations.getLabel('ORDER.CHECKOUT.PAYMENT_TYPES.SMARTPHONE_REACHED_LIMIT', { limit: Config.payconiqLimit })
                : translations.getLabel('ORDER.CHECKOUT.PAYMENT_TYPES.SMARTPHONE')
            }
            logo={<SvgPayconiq />}
          />
        </Link>
        <Link to={`${url}/merge`}>
          <ButtonCheckout
            icon="SvgBill"
            label={translations.getLabel(
              isUnfinishedOrder ? 'ORDER.CHECKOUT.PAYMENT_TYPES.MERGE_UNFINISHED' : 'ORDER.CHECKOUT.PAYMENT_TYPES.MERGE',
            )}
          />
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
