import { ApiError } from '../../_http';
import { Locale } from '../../_translations';
import { AuthAction, AuthActionType } from './actions';

export type AuthState = {
  errorLogin?: ApiError;
  errorLogout?: ApiError;
  isAuthenticateLoading: boolean;
  isDevMode?: boolean;
  isLoginLoading?: boolean;
  isLogoutLoading?: boolean;
  locale?: Locale;
};

const initialState: AuthState = {
  isAuthenticateLoading: true,
};

export default function reducer(state = initialState, action: AuthAction): AuthState {
  switch (action.type) {
    case AuthActionType.Login:
      return {
        ...state,
        errorLogin: null,
        isLoginLoading: true,
      };
    case AuthActionType.LoginError:
      return {
        ...state,
        errorLogin: action.payload.error,
        isLoginLoading: false,
      };
    case AuthActionType.Authenticate:
      return {
        ...state,
        isAuthenticateLoading: true,
      };
    case AuthActionType.AuthenticateSuccess:
      return {
        ...state,
        isAuthenticateLoading: false,
      };
    case AuthActionType.AuthenticateError:
      return {
        ...state,
        isAuthenticateLoading: false,
      };
    case AuthActionType.Logout:
      return {
        ...state,
        errorLogout: null,
        isLogoutLoading: true,
      };
    case AuthActionType.LogoutSuccess:
      return {
        ...state,
        isAuthenticateLoading: false,
        isLogoutLoading: false,
      };
    case AuthActionType.LogoutError:
      return {
        ...state,
        errorLogout: action.payload.error,
        isLogoutLoading: false,
      };
    case AuthActionType.SetLocale:
      return {
        ...state,
        locale: action.payload.locale,
      };
    case AuthActionType.SetDevMode:
      return {
        ...state,
        isDevMode: action.payload.isDevMode,
      };
    default:
      return state;
  }
}
