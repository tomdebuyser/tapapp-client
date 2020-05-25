import { IUser } from '../_models';
import { ApiError, HttpMetadataPagingResponse, HttpMetadataQuery } from '../../_http';
import { keepRetrievedDataPage } from '../../_utils/objectHelpers';
import { UsersAction, UsersActionType } from './actions';

export interface UsersState {
  detail?: IUser;
  errorCrudUsers?: ApiError;
  errorDeactivateUser?: ApiError;
  errorResendRegisterEmail?: ApiError;
  isCreateUserLoading?: boolean;
  isDeactivateUserLoading?: boolean;
  isGetUserDetailLoading?: boolean;
  isGetUsersLoading?: boolean;
  isResendRegisterEmailLoading?: boolean;
  isUpdateUserLoading?: boolean;
  metadata?: HttpMetadataPagingResponse;
  query?: HttpMetadataQuery;
  users?: IUser[];
}

const initialState: UsersState = {};

export default function reducer(state = initialState, action: UsersAction): UsersState {
  switch (action.type) {
    case UsersActionType.GetUserDetail:
      return {
        ...state,
        errorCrudUsers: null,
        isGetUserDetailLoading: true,
      };
    case UsersActionType.GetUserDetailSuccess: {
      return {
        ...state,
        detail: action.payload.data,
        isGetUserDetailLoading: false,
      };
    }
    case UsersActionType.GetUserDetailError:
      return {
        ...state,
        errorCrudUsers: action.payload.error,
        isGetUserDetailLoading: false,
      };
    case UsersActionType.GetUsers:
      return {
        ...state,
        errorCrudUsers: null,
        isGetUsersLoading: true,
        metadata: null,
      };
    case UsersActionType.GetUsersSuccess:
      return {
        ...state,
        isGetUsersLoading: false,
        metadata: action.payload.meta,
        users: keepRetrievedDataPage(state.users, action.payload.data, action.payload.meta),
      };
    case UsersActionType.GetUsersError:
      return {
        ...state,
        errorCrudUsers: action.payload.error,
        isGetUsersLoading: false,
      };
    case UsersActionType.SetUsersQuery:
      return {
        ...state,
        query: action.payload.query,
      };
    case UsersActionType.CreateUser:
      return {
        ...state,
        errorCrudUsers: null,
        isCreateUserLoading: true,
      };
    case UsersActionType.CreateUserSuccess:
      return {
        ...state,
        isCreateUserLoading: false,
      };
    case UsersActionType.CreateUserError:
      return {
        ...state,
        errorCrudUsers: action.payload.error,
        isCreateUserLoading: false,
      };
    case UsersActionType.UpdateUser:
      return {
        ...state,
        errorCrudUsers: null,
        isUpdateUserLoading: true,
      };
    case UsersActionType.UpdateUserSuccess:
      return {
        ...state,
        isUpdateUserLoading: false,
      };
    case UsersActionType.UpdateUserError:
      return {
        ...state,
        errorCrudUsers: action.payload.error,
        isUpdateUserLoading: false,
      };
    case UsersActionType.DeactivateUser:
      return {
        ...state,
        errorDeactivateUser: null,
        isDeactivateUserLoading: action.payload.confirmed,
      };
    case UsersActionType.DeactivateUserSuccess:
      return {
        ...state,
        isDeactivateUserLoading: false,
      };
    case UsersActionType.DeactivateUserError:
      return {
        ...state,
        errorDeactivateUser: action.payload.error,
        isDeactivateUserLoading: false,
      };
    case UsersActionType.ResendRegisterEmail:
      return {
        ...state,
        errorCrudUsers: null,
        isResendRegisterEmailLoading: true,
      };
    case UsersActionType.ResendRegisterEmailSuccess:
      return {
        ...state,
        isResendRegisterEmailLoading: false,
      };
    case UsersActionType.ResendRegisterEmailError:
      return {
        ...state,
        errorDeactivateUser: action.payload.error,
        isResendRegisterEmailLoading: false,
      };
    default:
      return state;
  }
}
