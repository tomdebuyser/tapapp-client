import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { payconiqActions } from '../../../_store/actions';
import { usePolling } from '../../../_hooks';
import PayconiqQrCode from '../../../payconiq/qrCode/PayconiqQrCode';
import { payconiqSelectors } from '../../../_store/selectors';
import { Button } from '../../../_shared';
import { PayconiqPaymentStatus } from '../../../payconiq/_models';
import { isIntermediatePayconiqStatus } from '../../../payconiq/_models/rules';
import { I18n } from '../../../_translations';
import './orderCheckoutPayconiq.scss';

const OrderCheckoutPayconiq: FC = () => {
  const dispatch = useDispatch();
  const payment = useSelector(payconiqSelectors.payment);

  useEffect(() => {
    dispatch(new payconiqActions.CreatePayconiqPayment());
    // Make sure pending payments are cancelled
    return () => {
      dispatch(new payconiqActions.InterruptPayconiqPayment());
    };
  }, []);

  usePolling(1000, () => {
    if (payment && isIntermediatePayconiqStatus(payment.status)) {
      dispatch(new payconiqActions.GetPayconiqPayment());
    }
  });

  function canRetryPayment(): boolean {
    if (!payment) return false;
    if (isIntermediatePayconiqStatus(payment.status)) return false;
    return payment.status !== PayconiqPaymentStatus.SUCCEEDED;
  }

  function canStopPayment(): boolean {
    return payment?.status !== PayconiqPaymentStatus.SUCCEEDED;
  }

  return (
    <div className="order-checkout-payconiq">
      <div className="container">
        <h1>{I18n.labels.ORDER.CHECKOUT.PAYCONIQ.TITLE}</h1>
        <span>{I18n.labels.ORDER.CHECKOUT.PAYCONIQ.EXPLANATION}</span>
        <div className="content">
          <PayconiqQrCode payment={payment} />
          <div className="buttons-wrapper">
            <div className="app-icons">
              <img alt="payconiq-app-icon" className="app-icon" src={require('../../../_assets/images/payconiq-app-icon.png')} />
              <img alt="kbc-app-icon" className="app-icon" src={require('../../../_assets/images/kbc-app-icon.png')} />
            </div>
            {canRetryPayment() && (
              <Button onClick={() => dispatch(new payconiqActions.CreatePayconiqPayment())} primary>
                {I18n.labels.ORDER.CHECKOUT.PAYCONIQ.BUTTON_RETRY}
              </Button>
            )}
            {canStopPayment() && (
              <Button
                negative
                onClick={() => {
                  // Pending payment is cancelled in epic
                  dispatch(push('/order/checkout'));
                }}
              >
                {I18n.labels.ORDER.CHECKOUT.PAYCONIQ.BUTTON_STOP}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCheckoutPayconiq;
