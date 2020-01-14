import { Action } from 'redux';
import { ApiError } from '../../_http';
import { IResetPasswordForm } from '../_models/ResetPassword';

export enum AuthActionType {
  ResetPassword = '[Auth] ResetPassword',
  ResetPasswordError = '[Auth] ResetPasswordError',
  ResetPasswordSuccess = '[Auth] ResetPasswordSuccess',
}

export class ResetPassword implements Action<AuthActionType> {
  readonly type = AuthActionType.ResetPassword;
  constructor(public payload: IResetPasswordForm) {}
}

export class ResetPasswordSuccess implements Action<AuthActionType> {
  readonly type = AuthActionType.ResetPasswordSuccess;
}

export class ResetPasswordError implements Action<AuthActionType> {
  readonly type = AuthActionType.ResetPasswordError;
  constructor(public payload: { error: ApiError }) {}
}

export type AuthActions = ResetPassword | ResetPasswordSuccess | ResetPasswordError;
