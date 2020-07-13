import { HttpClient } from '../../_http';
import { IOrder } from '../../order/_models';

export function getUnfinishedOrders(): Promise<IOrder[]> {
  return HttpClient.get<IOrder[]>('orders/all-unfinished');
}

export function mergeOrders(orderId: string, targetOrderId: string): Promise<void> {
  return HttpClient.post(`orders/${orderId}/merge/${targetOrderId}`);
}
