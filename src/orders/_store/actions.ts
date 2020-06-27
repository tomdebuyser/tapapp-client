import { Action } from 'redux';
import { ApiError } from '../../_http';
import { IOrder } from '../../order/_models';

export enum OrdersActionType {
  GetUnfinishedOrders = '[Orders] GetUnfinishedOrders',
  GetUnfinishedOrdersError = '[Orders] GetUnfinishedOrdersError',
  GetUnfinishedOrdersSuccess = '[Orders] GetUnfinishedOrdersSuccess',
}

export class GetUnfinishedOrders implements Action<OrdersActionType> {
  readonly type = OrdersActionType.GetUnfinishedOrders;
}

export class GetUnfinishedOrdersSuccess implements Action<OrdersActionType> {
  readonly type = OrdersActionType.GetUnfinishedOrdersSuccess;
  constructor(public payload: { orders: IOrder[] }) {}
}

export class GetUnfinishedOrdersError implements Action<OrdersActionType> {
  readonly type = OrdersActionType.GetUnfinishedOrdersError;
  constructor(public payload: { error?: ApiError }) {}
}

export type OrdersAction = GetUnfinishedOrders | GetUnfinishedOrdersSuccess | GetUnfinishedOrdersError;
