import { Action } from 'redux';
import { ApiError } from '../../_http';
import { IResetPasswordForm } from '../_models/ResetPassword';
import { ILoginForm } from '../_models/Login';
import { IUser } from '../../users/_models/User';

export enum AuthActionType {
  Login = '[Auth] Login',
  LoginError = '[Auth] LoginError',
  LoginSuccess = '[Auth] LoginSuccess',
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

export class Login implements Action<AuthActionType> {
  readonly type = AuthActionType.Login;
  constructor(public payload: ILoginForm) {}
}

export class LoginSuccess implements Action<AuthActionType> {
  readonly type = AuthActionType.LoginSuccess;
  constructor(public payload: { user: IUser }) {}
}

export class LoginError implements Action<AuthActionType> {
  readonly type = AuthActionType.LoginError;
  constructor(public payload: { error: ApiError }) {}
}

export type AuthActions = ResetPassword | ResetPasswordSuccess | ResetPasswordError | Login | LoginSuccess | LoginError;
