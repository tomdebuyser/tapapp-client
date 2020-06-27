import { PayconiqPaymentStatus } from './PayconiqPayment';

export function isIntermediatePayconiqStatus(status: PayconiqPaymentStatus): boolean {
  return [PayconiqPaymentStatus.PENDING, PayconiqPaymentStatus.IDENTIFIED, PayconiqPaymentStatus.AUTHORIZED].includes(status);
}

export function isReadyToScanPayconiqStatus(status: PayconiqPaymentStatus): boolean {
  return status !== PayconiqPaymentStatus.PENDING;
}
