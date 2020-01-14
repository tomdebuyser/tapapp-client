import { ApiError } from '../../_http';
import { AuthActions, AuthActionType } from './actions';

export interface AuthState {
  errorResetPassword?: ApiError;
  isResetPasswordLoading: boolean;
}

const initialState: AuthState = {
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
    default:
      return state;
  }
}
