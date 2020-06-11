import { ApiError } from '../../_http';
import { AuthAction, AuthActionType } from './actions';

export type AuthState = {
  errorLogin?: ApiError;
  errorLogout?: ApiError;
  isAuthenticateLoading: boolean;
  isLoginLoading?: boolean;
  isLogoutLoading?: boolean;
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
    default:
      return state;
  }
}
