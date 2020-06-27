import { HttpClient } from '../../_http';
import { IOrder, IOrderItem, PaymentType } from '../_models';

function composeOrderItemPayload(item: IOrderItem): Record<string, unknown> {
  return {
    amount: item.amount,
    id: item.id,
    productId: item.product.id,
  };
}

export function getOrder(orderId: string): Promise<IOrder> {
  return HttpClient.get<IOrder>(`orders/${orderId}`);
}

export function createOrder(items: IOrderItem[]): Promise<IOrder> {
  return HttpClient.post<IOrder>('orders', {
    items: items.map(composeOrderItemPayload),
  });
}

export function updateOrder(orderId: string, items?: IOrderItem[], clientName?: string): Promise<IOrder> {
  return HttpClient.patch<IOrder>(`orders/${orderId}`, {
    ...(items && { items: items.map(composeOrderItemPayload).filter(item => item.amount > 0) }),
    ...(clientName && { clientName }),
  });
}

export function deleteOrder(orderId: string): Promise<void> {
  return HttpClient.delete(`orders/${orderId}`);
}

export function payOrder(orderId: string, type: PaymentType.Cash | PaymentType.Free): Promise<void> {
  return HttpClient.post('payments', { orderId, type });
}

export function mergeOrders(orderId: string, targetOrderId: string): Promise<void> {
  return HttpClient.post(`orders/${orderId}/${targetOrderId}`);
}
