import { Action } from 'redux';
import { ApiError } from '../../_http';
import { IResetPasswordForm } from '../_models/ResetPassword';
import { ILoginForm } from '../_models/Login';
import { IUser } from '../../users/_models/User';
import { IRequestPasswordResetForm } from '../_models/RequestPasswordReset';

export enum AuthActionType {
  Login = '[Auth] Login',
  LoginError = '[Auth] LoginError',
  LoginSuccess = '[Auth] LoginSuccess',
  Logout = '[Auth] Logout',
  LogoutError = '[Auth] LogoutError',
  LogoutSuccess = '[Auth] LogoutSuccess',
  RequestPasswordReset = '[Auth] RequestPasswordReset',
  RequestPasswordResetError = '[Auth] RequestPasswordResetError',
  RequestPasswordResetSuccess = '[Auth] RequestPasswordResetSuccess',
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

export class Logout implements Action<AuthActionType> {
  readonly type = AuthActionType.Logout;
}

export class LogoutSuccess implements Action<AuthActionType> {
  readonly type = AuthActionType.LogoutSuccess;
}

export class LogoutError implements Action<AuthActionType> {
  readonly type = AuthActionType.LogoutError;
  constructor(public payload: { error: ApiError }) {}
}

export class RequestPasswordReset implements Action<AuthActionType> {
  readonly type = AuthActionType.RequestPasswordReset;
  constructor(public payload: IRequestPasswordResetForm) {}
}

export class RequestPasswordResetSuccess implements Action<AuthActionType> {
  readonly type = AuthActionType.RequestPasswordResetSuccess;
}

export class RequestPasswordResetError implements Action<AuthActionType> {
  readonly type = AuthActionType.RequestPasswordResetError;
  constructor(public payload: { error: ApiError }) {}
}

export type AuthActions =
  | ResetPassword
  | ResetPasswordSuccess
  | ResetPasswordError
  | Login
  | LoginSuccess
  | LoginError
  | Logout
  | LogoutSuccess
  | LogoutError
  | RequestPasswordReset
  | RequestPasswordResetSuccess
  | RequestPasswordResetError;
