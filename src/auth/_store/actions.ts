import { Action } from 'redux';
import { ApiError } from '../../_http';
import { ILoginForm } from '../_models';
import { IProfile } from '../../profile/_models';
import { Locale } from '../../_translations';

export enum AuthActionType {
  Authenticate = '[Auth] Authenticate',
  AuthenticateError = '[Auth] AuthenticateError',
  AuthenticateSuccess = '[Auth] AuthenticateSuccess',
  Login = '[Auth] Login',
  LoginError = '[Auth] LoginError',
  Logout = '[Auth] Logout',
  LogoutError = '[Auth] LogoutError',
  LogoutSuccess = '[Auth] LogoutSuccess',
  SetDevMode = '[Auth] SetDevMode',
  SetLocale = '[Auth] SetLocale',
}

export class Authenticate implements Action<AuthActionType> {
  readonly type = AuthActionType.Authenticate;
}

export class AuthenticateSuccess implements Action<AuthActionType> {
  readonly type = AuthActionType.AuthenticateSuccess;
  constructor(public payload: { pathname?: string; profile: IProfile }) {}
}

export class AuthenticateError implements Action<AuthActionType> {
  readonly type = AuthActionType.AuthenticateError;
  constructor(public payload: { error?: ApiError }) {}
}

export class Login implements Action<AuthActionType> {
  readonly type = AuthActionType.Login;
  constructor(public payload: { pathname?: string; values: ILoginForm }) {}
}

export class LoginError implements Action<AuthActionType> {
  readonly type = AuthActionType.LoginError;
  constructor(public payload: { error?: ApiError }) {}
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

export class SetLocale implements Action<AuthActionType> {
  readonly type = AuthActionType.SetLocale;
  constructor(public payload: { locale: Locale }) {}
}

export class SetDevMode implements Action<AuthActionType> {
  readonly type = AuthActionType.SetDevMode;
  constructor(public payload: { isDevMode: boolean }) {}
}

export type AuthAction =
  | Authenticate
  | AuthenticateSuccess
  | AuthenticateError
  | Login
  | LoginError
  | Logout
  | LogoutSuccess
  | LogoutError
  | SetLocale
  | SetDevMode;
