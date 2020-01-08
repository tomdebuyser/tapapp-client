import { IUser } from '../_models/User';
import { ApiError } from '../../_http';
import { HttpMetadataPagingResponse } from '../../_http/HttpMetadata';
import { UsersAction, UsersActionType } from './actions';

export interface UsersState {
  isCreateUserLoading: boolean;
  isGetUsersLoading: boolean;
  errorCreateUser?: ApiError;
  errorGetUsers?: ApiError;
  metadata?: HttpMetadataPagingResponse;
  users?: IUser[];
}

const initialState: UsersState = {
  isGetUsersLoading: false,
  isCreateUserLoading: false,
};

export default function reducer(state = initialState, action: UsersAction): UsersState {
  switch (action.type) {
    case UsersActionType.GetUsers:
      return {
        ...state,
        isGetUsersLoading: true,
        errorGetUsers: null,
        metadata: null,
      };
    case UsersActionType.GetUsersSuccess:
      return {
        ...state,
        isGetUsersLoading: false,
        users: action.payload.data,
        metadata: action.payload.meta,
      };
    case UsersActionType.GetUsersError:
      return {
        ...state,
        isGetUsersLoading: false,
        errorGetUsers: action.payload.error,
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
