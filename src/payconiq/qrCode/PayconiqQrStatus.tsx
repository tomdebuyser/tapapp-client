import React, { FC } from 'react';
import { Loader } from 'semantic-ui-react';
import { PayconiqPaymentStatus } from '../_models';
import { Icon } from '../../_shared';
import { I18n } from '../../_translations';

type Props = {
  status: PayconiqPaymentStatus;
};

const PayconiqQrStatus: FC<Props> = ({ status }) => {
  function renderLoader(text: string) {
    return (
      <Loader active inverted size="huge">
        {text}
      </Loader>
    );
  }

  function renderStatus() {
    switch (status) {
      case PayconiqPaymentStatus.IDENTIFIED:
        return renderLoader(I18n.labels.ORDER.CHECKOUT.PAYCONIQ.STATUS.IDENTIFIED);
      case PayconiqPaymentStatus.AUTHORIZED:
        return renderLoader(I18n.labels.ORDER.CHECKOUT.PAYCONIQ.STATUS.AUTHORIZED);
      case PayconiqPaymentStatus.SUCCEEDED:
        return (
          <>
            <Icon className="success" name="SvgCheckCircle" />
            <span>{I18n.labels.ORDER.CHECKOUT.PAYCONIQ.STATUS.SUCCEEDED}</span>
          </>
        );
      case PayconiqPaymentStatus.AUTHORIZATION_FAILED:
      case PayconiqPaymentStatus.FAILED:
        return (
          <>
            <Icon name="SvgCloseCircle" />
            <span>{I18n.labels.ORDER.CHECKOUT.PAYCONIQ.STATUS.FAILED}</span>
          </>
        );
      case PayconiqPaymentStatus.EXPIRED:
        return (
          <>
            <Icon name="SvgCloseCircle" />
            <span>{I18n.labels.ORDER.CHECKOUT.PAYCONIQ.STATUS.EXPIRED}</span>
          </>
        );
      case PayconiqPaymentStatus.CANCELLED:
        return (
          <>
            <Icon name="SvgCloseCircle" />
            <span>{I18n.labels.ORDER.CHECKOUT.PAYCONIQ.STATUS.CANCELLED}</span>
          </>
        );
      case PayconiqPaymentStatus.PENDING:
        return null;
      default:
        return renderLoader(I18n.labels.ORDER.CHECKOUT.PAYCONIQ.STATUS.LOADING);
    }
  }

  return <div className="payconiq-qr-status">{renderStatus()}</div>;
};

export default PayconiqQrStatus;
