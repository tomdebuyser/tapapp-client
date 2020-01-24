import { ApiError } from '../../_http';
import { AuthAction, AuthActionType } from './actions';

export interface AuthState {
  errorChoosePassword?: ApiError;
  errorLogin?: ApiError;
  errorLogout?: ApiError;
  errorRequestPasswordReset?: ApiError;
  isAuthenticateLoading: boolean;
  isChoosePasswordLoading?: boolean;
  isLoginLoading?: boolean;
  isLogoutLoading?: boolean;
  isRequestPasswordResetLoading?: boolean;
}

const initialState: AuthState = {
  isAuthenticateLoading: true,
};

export default function reducer(state = initialState, action: AuthAction): AuthState {
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
      };
    case AuthActionType.Authenticate:
      return {
        ...state,
        isAuthenticateLoading: true,
      };
    case AuthActionType.AuthenticateSuccess:
      return {
        ...state,
        isLoginLoading: false,
        isAuthenticateLoading: false,
      };
    case AuthActionType.AuthenticateError:
      return {
        ...state,
        isLoginLoading: false,
        isAuthenticateLoading: false,
        errorLogin: action.payload.error,
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
        isAuthenticateLoading: false,
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
