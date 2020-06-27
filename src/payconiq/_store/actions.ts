import { Action } from 'redux';
import { ApiError } from '../../_http';
import { IPayconiqPayment } from '../_models';

export enum PayconiqPaymentActionType {
  CancelPayconiqPayment = '[PayconiqPayment] CancelPayconiqPayment',
  CancelPayconiqPaymentError = '[PayconiqPayment] CancelPayconiqPaymentError',
  CancelPayconiqPaymentSuccess = '[PayconiqPayment] CancelPayconiqPaymentSuccess',
  ClearState = '[PayconiqPayment] ClearState',
  CreatePayconiqPayment = '[PayconiqPayment] CreatePayconiqPayment',
  CreatePayconiqPaymentError = '[PayconiqPayment] CreatePayconiqPaymentError',
  CreatePayconiqPaymentSuccess = '[PayconiqPayment] CreatePayconiqPaymentSuccess',
  GetPayconiqPayment = '[PayconiqPayment] GetPayconiqPayment',
  GetPayconiqPaymentError = '[PayconiqPayment] GetPayconiqPaymentError',
  GetPayconiqPaymentSuccess = '[PayconiqPayment] GetPayconiqPaymentSuccess',
  InterruptPayconiqPayment = '[PayconiqPayment] InterruptPayconiqPayment',
}

export class ClearState implements Action<PayconiqPaymentActionType> {
  readonly type = PayconiqPaymentActionType.ClearState;
}

export class GetPayconiqPayment implements Action<PayconiqPaymentActionType> {
  readonly type = PayconiqPaymentActionType.GetPayconiqPayment;
}

export class GetPayconiqPaymentSuccess implements Action<PayconiqPaymentActionType> {
  readonly type = PayconiqPaymentActionType.GetPayconiqPaymentSuccess;
  constructor(public payload: { payment: IPayconiqPayment }) {}
}

export class GetPayconiqPaymentError implements Action<PayconiqPaymentActionType> {
  readonly type = PayconiqPaymentActionType.GetPayconiqPaymentError;
  constructor(public payload: { error?: ApiError }) {}
}

export class CreatePayconiqPayment implements Action<PayconiqPaymentActionType> {
  readonly type = PayconiqPaymentActionType.CreatePayconiqPayment;
}

export class CreatePayconiqPaymentSuccess implements Action<PayconiqPaymentActionType> {
  readonly type = PayconiqPaymentActionType.CreatePayconiqPaymentSuccess;
  constructor(public payload: { payment: IPayconiqPayment }) {}
}

export class CreatePayconiqPaymentError implements Action<PayconiqPaymentActionType> {
  readonly type = PayconiqPaymentActionType.CreatePayconiqPaymentError;
  constructor(public payload: { error?: ApiError }) {}
}

export class CancelPayconiqPayment implements Action<PayconiqPaymentActionType> {
  readonly type = PayconiqPaymentActionType.CancelPayconiqPayment;
}

export class CancelPayconiqPaymentSuccess implements Action<PayconiqPaymentActionType> {
  readonly type = PayconiqPaymentActionType.CancelPayconiqPaymentSuccess;
}

export class CancelPayconiqPaymentError implements Action<PayconiqPaymentActionType> {
  readonly type = PayconiqPaymentActionType.CancelPayconiqPaymentError;
  constructor(public payload: { error?: ApiError }) {}
}

export class InterruptPayconiqPayment implements Action<PayconiqPaymentActionType> {
  readonly type = PayconiqPaymentActionType.InterruptPayconiqPayment;
}

export type PayconiqPaymentAction =
  | CancelPayconiqPayment
  | CancelPayconiqPaymentSuccess
  | CancelPayconiqPaymentError
  | ClearState
  | CreatePayconiqPayment
  | CreatePayconiqPaymentSuccess
  | CreatePayconiqPaymentError
  | GetPayconiqPayment
  | GetPayconiqPaymentSuccess
  | GetPayconiqPaymentError
  | InterruptPayconiqPayment;
