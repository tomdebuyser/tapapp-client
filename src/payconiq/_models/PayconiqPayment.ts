export type IPayconiqPayment = {
  id: string;
  orderId: string;
  qrCode?: string;
  status: PayconiqPaymentStatus;
};

export enum PayconiqPaymentStatus {
  AUTHORIZATION_FAILED = 'AUTHORIZATION_FAILED',
  AUTHORIZED = 'AUTHORIZED',
  CANCELLED = 'CANCELLED',
  EXPIRED = 'EXPIRED',
  FAILED = 'FAILED',
  IDENTIFIED = 'IDENTIFIED',
  PENDING = 'PENDING',
  SUCCEEDED = 'SUCCEEDED',
}
