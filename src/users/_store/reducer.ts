import { IUser } from '../_models/User';
import { ApiError } from '../../_http';
import { HttpMetadataPagingResponse, HttpMetadataQuery } from '../../_http/HttpMetadata';
import { UsersAction, UsersActionType } from './actions';

export interface UsersState {
  isCreateUserLoading: boolean;
  isGetUsersLoading: boolean;
  errorCreateUser?: ApiError;
  errorGetUsers?: ApiError;
  metadata?: HttpMetadataPagingResponse;
  users?: IUser[];
  query?: HttpMetadataQuery;
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
    case UsersActionType.GetUsersSuccess: {
      let currentData = state.users || [];
      if (!action.payload.skip) currentData = []; // Start overnew when the offset was reset
      const updatedIds = action.payload.data.map(value => value.id);
      return {
        ...state,
        isGetUsersLoading: false,
        users: [...currentData.filter(value => !updatedIds.includes(value.id)), ...action.payload.data],
        metadata: action.payload.meta,
      };
    }
    case UsersActionType.GetUsersError:
      return {
        ...state,
        isGetUsersLoading: false,
        errorGetUsers: action.payload.error,
      };
    case UsersActionType.SetUsersQuery:
      return {
        ...state,
        query: action.payload.query,
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
