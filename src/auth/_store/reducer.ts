import { ApiError } from '../../_http';
import { IUser } from '../../users/_models/User';
import { AuthActions, AuthActionType } from './actions';

export interface AuthState {
  errorAuthenticate?: ApiError;
  errorChoosePassword?: ApiError;
  errorLogin?: ApiError;
  errorLogout?: ApiError;
  errorRequestPasswordReset?: ApiError;
  isAuthenticateLoading: boolean;
  isChoosePasswordLoading: boolean;
  isLoginLoading: boolean;
  isLogoutLoading: boolean;
  isRequestPasswordResetLoading: boolean;
  user?: IUser;
}

const initialState: AuthState = {
  isAuthenticateLoading: true,
  isLoginLoading: false,
  isChoosePasswordLoading: false,
  isLogoutLoading: false,
  isRequestPasswordResetLoading: false,
};

export default function reducer(state = initialState, action: AuthActions): AuthState {
  switch (action.type) {
    case AuthActionType.ChoosePassword:
      return {
        ...state,
        isChoosePasswordLoading: true,
        errorChoosePassword: null,
      };
    case AuthActionType.ChoosePasswordSuccess:
      return {
        ...state,
        isChoosePasswordLoading: false,
      };
    case AuthActionType.ChoosePasswordError:
      return {
        ...state,
        isChoosePasswordLoading: false,
        errorChoosePassword: action.payload.error,
      };
    case AuthActionType.Login:
      return {
        ...state,
        isLoginLoading: true,
        errorLogin: null,
        user: null,
      };
    case AuthActionType.LoginSuccess:
      return {
        ...state,
        isLoginLoading: false,
        user: action.payload.user,
      };
    case AuthActionType.LoginError:
      return {
        ...state,
        isLoginLoading: false,
        errorLogin: action.payload.error,
      };
    case AuthActionType.Authenticate:
      return {
        ...state,
        isAuthenticateLoading: true,
        errorAuthenticate: null,
        user: null,
      };
    case AuthActionType.AuthenticateSuccess:
      return {
        ...state,
        isAuthenticateLoading: false,
        user: action.payload.user,
      };
    case AuthActionType.AuthenticateError:
      return {
        ...state,
        isAuthenticateLoading: false,
        errorAuthenticate: action.payload.error,
      };
    case AuthActionType.Logout:
      return {
        ...state,
        isLogoutLoading: true,
        errorLogout: null,
      };
    case AuthActionType.LogoutSuccess:
      return {
        ...state,
        isLogoutLoading: false,
        user: null,
      };
    case AuthActionType.LogoutError:
      return {
        ...state,
        isLogoutLoading: false,
        errorLogout: action.payload.error,
      };
    case AuthActionType.RequestPasswordReset:
      return {
        ...state,
        isRequestPasswordResetLoading: true,
        errorRequestPasswordReset: null,
      };
    case AuthActionType.RequestPasswordResetSuccess:
      return {
        ...state,
        isRequestPasswordResetLoading: false,
      };
    case AuthActionType.RequestPasswordResetError:
      return {
        ...state,
        isRequestPasswordResetLoading: false,
        errorRequestPasswordReset: action.payload.error,
      };
    default:
      return state;
  }
}
