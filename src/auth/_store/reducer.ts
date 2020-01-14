import { ApiError } from '../../_http';
import { IUser } from '../../users/_models/User';
import { AuthActions, AuthActionType } from './actions';

export interface AuthState {
  errorLogin?: ApiError;
  errorResetPassword?: ApiError;
  isLoginLoading: boolean;
  isResetPasswordLoading: boolean;
  user?: IUser;
}

const initialState: AuthState = {
  isLoginLoading: false,
  isResetPasswordLoading: false,
};

export default function reducer(state = initialState, action: AuthActions): AuthState {
  switch (action.type) {
    case AuthActionType.ResetPassword:
      return {
        ...state,
        isResetPasswordLoading: true,
        errorResetPassword: null,
      };
    case AuthActionType.ResetPasswordSuccess:
      return {
        ...state,
        isResetPasswordLoading: false,
      };
    case AuthActionType.ResetPasswordError:
      return {
        ...state,
        isResetPasswordLoading: false,
        errorResetPassword: action.payload.error,
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
    default:
      return state;
  }
}
