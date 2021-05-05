import React, { FC } from 'react';
import classnames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import { SvgPayconiq } from '../../../_assets/svg';
import { orderActions } from '../../../_store/actions';
import { PaymentType } from '../../_models';
import { orderSelectors } from '../../../_store/selectors';
import { hasReachedPayconiqLimit } from '../../_models/rules';
import { Config } from '../../../config';
import { I18n } from '../../../_translations';
import ButtonCheckout from './buttonCheckout/ButtonCheckout';
import './orderCheckoutOptions.scss';

const OrderCheckoutOptions: FC = () => {
  const { url } = useRouteMatch();
  const dispatch = useDispatch();
  // const isUnfinishedOrder = useSelector(orderSelectors.isUnfinishedOrder);
  const totalPrice = useSelector(orderSelectors.totalPrice);

  return (
    <div className="order-checkout-options container">
      <h1>{I18n.labels.ORDER.CHECKOUT.TITLE}</h1>
      <div className="buttons">
        <Link to={`${url}/cash`}>
          <ButtonCheckout icon="SvgCash" label={I18n.labels.ORDER.CHECKOUT.PAYMENT_TYPES.CASH} />
        </Link>
        <Link className={classnames({ disabled: hasReachedPayconiqLimit(totalPrice) })} to={`${url}/payconiq`}>
          <ButtonCheckout
            icon="SvgSmartphone"
            label={
              hasReachedPayconiqLimit(totalPrice)
                ? I18n.insert(I18n.labels.ORDER.CHECKOUT.PAYMENT_TYPES.SMARTPHONE_REACHED_LIMIT, { limit: Config.payconiqLimit })
                : I18n.labels.ORDER.CHECKOUT.PAYMENT_TYPES.SMARTPHONE
            }
            logo={<SvgPayconiq />}
          />
        </Link>
        {/* TODO: Introduct merging */}
        {/* <Link to={`${url}/merge`}>
          <ButtonCheckout
            icon="SvgBill"
            label={
              isUnfinishedOrder
                ? I18n.labels.ORDER.CHECKOUT.PAYMENT_TYPES.MERGE_UNFINISHED
                : I18n.labels.ORDER.CHECKOUT.PAYMENT_TYPES.MERGE
            }
          />
        </Link> */}
        <ButtonCheckout
          icon="SvgFree"
          label={I18n.labels.ORDER.CHECKOUT.PAYMENT_TYPES.FREE}
          onClick={() => dispatch(new orderActions.PayOrder({ paymentType: PaymentType.Free }))}
        />
      </div>
    </div>
  );
};

export default OrderCheckoutOptions;
