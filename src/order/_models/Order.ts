import { IProduct } from '../../categories/_models';

export type IOrder = {
  clientName?: string;
  createdAt: string;
  id: string;
  items: IOrderItem[];
};

export type IOrderItem = {
  amount: number;
  createdAt?: string;
  id?: string;
  product: IProduct;
};

export enum PaymentType {
  Cash = 'CASH',
  Free = 'FREE',
  Payconiq = 'PAYCONIQ',
}
