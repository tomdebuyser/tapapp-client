import { HttpClient } from '../../_http';
import { IOrder } from '../../order/_models';

export async function getUnfinishedOrders(): Promise<IOrder[]> {
  const { data } = await HttpClient.get<{ data: IOrder[] }>('orders?isFinished=false');
  return data;
}
