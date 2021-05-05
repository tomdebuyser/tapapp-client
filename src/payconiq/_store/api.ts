import { HttpClient } from '../../_http';
import { IPayconiqPayment } from '../_models';

export function getPayconiqPayment(paymentId: string): Promise<IPayconiqPayment> {
  return HttpClient.get<IPayconiqPayment>(`payments/payconiq/${paymentId}`);
}

export function createPayconiqPayment(orderId: string): Promise<IPayconiqPayment> {
  return HttpClient.post<IPayconiqPayment>('payments/payconiq', { orderId });
}

export function cancelPayconiqPayment(paymentId: string): Promise<void> {
  return HttpClient.delete(`payments/payconiq/${paymentId}`);
}
