import React, { FC } from 'react';
import { IPayconiqPayment } from '../_models';
import { SvgPayconiqQr } from '../../_assets/svg';
import { isIntermediatePayconiqStatus, isReadyToScanPayconiqStatus } from '../_models/rules';
import PayconiqQrStatus from './PayconiqQrStatus';
import './payconiqQrCode.scss';

type Props = {
  payment: IPayconiqPayment;
};

const PayconiqQrCode: FC<Props> = ({ payment }) => (
  <div className="payconiq-qr-code">
    <SvgPayconiqQr className="branding" />
    {isIntermediatePayconiqStatus(payment?.payconiqStatus) && (
      <div className="qr-code-wrapper">
        <img src={payment.payconiqQrCode} />
      </div>
    )}
    {isReadyToScanPayconiqStatus(payment?.payconiqStatus) && <div className="status-overlay"></div>}
    <div className="loading-wrapper">
      <PayconiqQrStatus status={payment?.payconiqStatus} />
    </div>
  </div>
);

export default PayconiqQrCode;
