import { Action } from 'redux';
import { ApiError } from '../../_http';
import { IProduct, ICategory } from '../../categories/_models';
import { IOrder, PaymentType } from '../_models';

export enum OrderActionType {
  AddClientName = '[Order] AddClientName',
  AddClientNameError = '[Order] AddClientNameError',
  AddClientNameSuccess = '[Order] AddClientNameSuccess',
  AddRemoveProduct = '[Order] AddRemoveProduct',
  ClearState = '[Order] ClearState',
  CreateOrder = '[Order] CreateOrder',
  CreateOrderError = '[Order] CreateOrderError',
  CreateOrderSuccess = '[Order] CreateOrderSuccess',
  DeleteOrder = '[Order] DeleteOrder',
  DeleteOrderError = '[Order] DeleteOrderError',
  DeleteOrderSuccess = '[Order] DeleteOrderSuccess',
  GetOrder = '[Order] GetOrder',
  GetOrderError = '[Order] GetOrderError',
  GetOrderSuccess = '[Order] GetOrderSuccess',
  PayOrder = '[Order] PayOrder',
  PayOrderError = '[Order] PayOrderError',
  PayOrderSuccess = '[Order] PayOrderSuccess',
  SetActiveCategory = '[Order] SetActiveCategory',
  UpdateOrder = '[Order] UpdateOrder',
  UpdateOrderError = '[Order] UpdateOrderError',
  UpdateOrderSuccess = '[Order] UpdateOrderSuccess',
}

export class ClearState implements Action<OrderActionType> {
  readonly type = OrderActionType.ClearState;
}

export class AddRemoveProduct implements Action<OrderActionType> {
  readonly type = OrderActionType.AddRemoveProduct;
  constructor(public payload: { amountToAdd: number; product: IProduct }) {}
}

export class SetActiveCategory implements Action<OrderActionType> {
  readonly type = OrderActionType.SetActiveCategory;
  constructor(public payload: { category: ICategory }) {}
}

export class GetOrder implements Action<OrderActionType> {
  readonly type = OrderActionType.GetOrder;
  constructor(public payload: { isUnfinished?: boolean; orderId: string }) {}
}

export class GetOrderSuccess implements Action<OrderActionType> {
  readonly type = OrderActionType.GetOrderSuccess;
  constructor(public payload: { order: IOrder }) {}
}

export class GetOrderError implements Action<OrderActionType> {
  readonly type = OrderActionType.GetOrderError;
  constructor(public payload: { error?: ApiError }) {}
}

export class CreateOrder implements Action<OrderActionType> {
  readonly type = OrderActionType.CreateOrder;
}

export class CreateOrderSuccess implements Action<OrderActionType> {
  readonly type = OrderActionType.CreateOrderSuccess;
  constructor(public payload: { createdOrder: IOrder }) {}
}

export class CreateOrderError implements Action<OrderActionType> {
  readonly type = OrderActionType.CreateOrderError;
  constructor(public payload: { error?: ApiError }) {}
}

export class UpdateOrder implements Action<OrderActionType> {
  readonly type = OrderActionType.UpdateOrder;
}

export class UpdateOrderSuccess implements Action<OrderActionType> {
  readonly type = OrderActionType.UpdateOrderSuccess;
  constructor(public payload: { updatedOrder: IOrder }) {}
}

export class UpdateOrderError implements Action<OrderActionType> {
  readonly type = OrderActionType.UpdateOrderError;
  constructor(public payload: { error?: ApiError }) {}
}

export class AddClientName implements Action<OrderActionType> {
  readonly type = OrderActionType.AddClientName;
  constructor(public payload: { clientName?: string; onSuccess?: () => void }) {}
}

export class AddClientNameSuccess implements Action<OrderActionType> {
  readonly type = OrderActionType.AddClientNameSuccess;
  constructor(public payload: { updatedOrder: IOrder }) {}
}

export class AddClientNameError implements Action<OrderActionType> {
  readonly type = OrderActionType.AddClientNameError;
  constructor(public payload: { error?: ApiError }) {}
}

export class DeleteOrder implements Action<OrderActionType> {
  readonly type = OrderActionType.DeleteOrder;
  constructor(public payload?: { confirmed: boolean }) {}
}

export class DeleteOrderSuccess implements Action<OrderActionType> {
  readonly type = OrderActionType.DeleteOrderSuccess;
}

export class DeleteOrderError implements Action<OrderActionType> {
  readonly type = OrderActionType.DeleteOrderError;
  constructor(public payload: { error?: ApiError }) {}
}

export class PayOrder implements Action<OrderActionType> {
  readonly type = OrderActionType.PayOrder;
  constructor(public payload: { paymentType: PaymentType.Cash | PaymentType.Free }) {}
}

export class PayOrderSuccess implements Action<OrderActionType> {
  readonly type = OrderActionType.PayOrderSuccess;
}

export class PayOrderError implements Action<OrderActionType> {
  readonly type = OrderActionType.PayOrderError;
  constructor(public payload: { error?: ApiError }) {}
}

export type OrderAction =
  | AddClientName
  | AddClientNameError
  | AddClientNameSuccess
  | AddRemoveProduct
  | ClearState
  | CreateOrder
  | CreateOrderError
  | CreateOrderSuccess
  | DeleteOrder
  | DeleteOrderError
  | DeleteOrderSuccess
  | GetOrder
  | GetOrderError
  | GetOrderSuccess
  | PayOrder
  | PayOrderError
  | PayOrderSuccess
  | UpdateOrder
  | UpdateOrderError
  | UpdateOrderSuccess
  | SetActiveCategory;
