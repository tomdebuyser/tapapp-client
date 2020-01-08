import { IUser } from '../_models/User';
import { ApiError } from '../../_http';
import { HttpMetadataPagingResponse } from '../../_http/HttpMetadata';
import { UsersAction, UsersActionType } from './actions';

export interface UsersState {
  users?: IUser[];
  metadata?: HttpMetadataPagingResponse;
  isLoading: boolean;
  error?: ApiError;
  isCreateUserLoading: boolean;
  errorCreateUser?: ApiError;
}

const initialState: UsersState = {
  isLoading: false,
  isCreateUserLoading: false,
};

export default function reducer(state = initialState, action: UsersAction): UsersState {
  switch (action.type) {
    case UsersActionType.GetUsers:
      return {
        ...state,
        isLoading: true,
        error: null,
        metadata: null,
      };
    case UsersActionType.GetUsersSuccess:
      return {
        ...state,
        isLoading: false,
        users: action.payload.data,
        metadata: action.payload.meta,
      };
    case UsersActionType.GetUsersError:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    case UsersActionType.CreateUser:
      return {
        ...state,
        isCreateUserLoading: true,
        errorCreateUser: null,
      };
    case UsersActionType.CreateUserSuccess:
      return {
        ...state,
        isCreateUserLoading: false,
      };
    case UsersActionType.CreateUserError:
      return {
        ...state,
        isCreateUserLoading: false,
        errorCreateUser: action.payload.error,
      };
    default:
      return state;
  }
}
