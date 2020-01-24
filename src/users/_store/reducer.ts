import { IUser } from '../_models';
import { ApiError, HttpMetadataPagingResponse, HttpMetadataQuery } from '../../_http';
import { insertUpdatedData } from '../../_utils/objectHelpers';
import { UsersAction, UsersActionType } from './actions';

export interface UsersState {
  errorCrudUser?: ApiError;
  errorInactivateUser?: ApiError;
  errorResendRegisterEmail?: ApiError;
  isCreateUserLoading?: boolean;
  isGetUsersLoading?: boolean;
  isInactivateUserLoading?: boolean;
  isResendRegisterEmailLoading?: boolean;
  isUpdateUserLoading?: boolean;
  metadata?: HttpMetadataPagingResponse;
  query?: HttpMetadataQuery;
  users?: IUser[];
}

export const initialState: UsersState = {};

export default function reducer(state = initialState, action: UsersAction): UsersState {
  switch (action.type) {
    case UsersActionType.GetUsers:
      return {
        ...state,
        isGetUsersLoading: true,
        errorCrudUser: null,
        metadata: null,
      };
    case UsersActionType.GetUsersSuccess: {
      let currentData = state.users || [];
      if (!action.payload.meta.skip) currentData = []; // Start overnew when the offset was reset
      return {
        ...state,
        isGetUsersLoading: false,
        users: insertUpdatedData(currentData, action.payload.data),
        metadata: action.payload.meta,
      };
    }
    case UsersActionType.GetUsersError:
      return {
        ...state,
        isGetUsersLoading: false,
        errorCrudUser: action.payload.error,
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
        errorCrudUser: null,
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
        errorCrudUser: action.payload.error,
      };
    case UsersActionType.UpdateUser:
      return {
        ...state,
        isUpdateUserLoading: true,
        errorCrudUser: null,
      };
    case UsersActionType.UpdateUserSuccess:
      return {
        ...state,
        isUpdateUserLoading: false,
        users: insertUpdatedData(state.users, [action.payload.updatedUser]),
      };
    case UsersActionType.UpdateUserError:
      return {
        ...state,
        isUpdateUserLoading: false,
        errorCrudUser: action.payload.error,
      };
    case UsersActionType.InactivateUser:
      return {
        ...state,
        isInactivateUserLoading: action.payload.confirmed,
        errorInactivateUser: null,
      };
    case UsersActionType.InactivateUserSuccess:
      return {
        ...state,
        isInactivateUserLoading: false,
        users: insertUpdatedData(state.users, [action.payload.updatedUser]),
      };
    case UsersActionType.InactivateUserError:
      return {
        ...state,
        isInactivateUserLoading: false,
        errorInactivateUser: action.payload.error,
      };
    case UsersActionType.ResendRegisterEmail:
      return {
        ...state,
        isResendRegisterEmailLoading: true,
        errorCrudUser: null,
      };
    case UsersActionType.ResendRegisterEmailSuccess:
      return {
        ...state,
        isResendRegisterEmailLoading: false,
        users: insertUpdatedData(state.users, [action.payload.updatedUser]),
      };
    case UsersActionType.ResendRegisterEmailError:
      return {
        ...state,
        isResendRegisterEmailLoading: false,
        errorInactivateUser: action.payload.error,
      };
    default:
      return state;
  }
}
