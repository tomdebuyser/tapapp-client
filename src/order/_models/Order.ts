import { IProduct } from '../../categories/_models';

type PayconiqPaymentStatus = {}; // TODO: Implement

export type IOrder = {
  clientName?: string;
  createdAt: string;
  id: string;
  items: IOrderItem[];
  payment?: {
    data?: {
      _links: { qrcode: { href: string } };
      status: PayconiqPaymentStatus;
    };
    type: PaymentType;
  };
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
