import { Action } from 'redux';
import { ApiError } from '../../_http';
import { IChangePasswordForm } from '../_models/ChoosePassword';
import { ILoginForm } from '../_models/Login';
import { IUser } from '../../users/_models/User';
import { IRequestPasswordResetForm } from '../_models/RequestPasswordReset';

export enum AuthActionType {
  Authenticate = '[Auth] Authenticate',
  AuthenticateError = '[Auth] AuthenticateError',
  AuthenticateSuccess = '[Auth] AuthenticateSuccess',
  ChoosePassword = '[Auth] ChoosePassword',
  ChoosePasswordError = '[Auth] ChoosePasswordError',
  ChoosePasswordSuccess = '[Auth] ChoosePasswordSuccess',
  Login = '[Auth] Login',
  LoginError = '[Auth] LoginError',
  LoginSuccess = '[Auth] LoginSuccess',
  Logout = '[Auth] Logout',
  LogoutError = '[Auth] LogoutError',
  LogoutSuccess = '[Auth] LogoutSuccess',
  RequestPasswordReset = '[Auth] RequestPasswordReset',
  RequestPasswordResetError = '[Auth] RequestPasswordResetError',
  RequestPasswordResetSuccess = '[Auth] RequestPasswordResetSuccess',
}

export class Authenticate implements Action<AuthActionType> {
  readonly type = AuthActionType.Authenticate;
  constructor(public payload: { pathname: string }) {}
}

export class AuthenticateSuccess implements Action<AuthActionType> {
  readonly type = AuthActionType.AuthenticateSuccess;
  constructor(public payload: { pathname: string; user: IUser }) {}
}

export class AuthenticateError implements Action<AuthActionType> {
  readonly type = AuthActionType.AuthenticateError;
  constructor(public payload: { error: ApiError }) {}
}

export class ChoosePassword implements Action<AuthActionType> {
  readonly type = AuthActionType.ChoosePassword;
  constructor(public payload: IChangePasswordForm) {}
}

export class ChoosePasswordSuccess implements Action<AuthActionType> {
  readonly type = AuthActionType.ChoosePasswordSuccess;
}

export class ChoosePasswordError implements Action<AuthActionType> {
  readonly type = AuthActionType.ChoosePasswordError;
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
  | Authenticate
  | AuthenticateSuccess
  | AuthenticateError
  | ChoosePassword
  | ChoosePasswordSuccess
  | ChoosePasswordError
  | Login
  | LoginSuccess
  | LoginError
  | Logout
  | LogoutSuccess
  | LogoutError
  | RequestPasswordReset
  | RequestPasswordResetSuccess
  | RequestPasswordResetError;
