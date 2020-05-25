import { IRole } from '../_models';
import { ApiError, HttpMetadataPagingResponse, HttpMetadataQuery } from '../../_http';
import { keepRetrievedDataPage } from '../../_utils/objectHelpers';
import { RolesAction, RolesActionType } from './actions';

export type RolesState = {
  detail?: IRole;
  errorCrudRoles?: ApiError;
  isCreateRoleLoading?: boolean;
  isDeleteRoleLoading?: boolean;
  isGetRoleDetailLoading?: boolean;
  isGetRolesLoading?: boolean;
  isUpdateRoleLoading?: boolean;
  metadata?: HttpMetadataPagingResponse;
  query?: HttpMetadataQuery;
  roles?: IRole[];
};

const initialState: RolesState = {};

export default function reducer(state = initialState, action: RolesAction): RolesState {
  switch (action.type) {
    case RolesActionType.GetRoleDetail:
      return {
        ...state,
        errorCrudRoles: null,
        isGetRoleDetailLoading: true,
      };
    case RolesActionType.GetRoleDetailSuccess: {
      return {
        ...state,
        detail: action.payload.data,
        isGetRoleDetailLoading: false,
      };
    }
    case RolesActionType.GetRoleDetailError:
      return {
        ...state,
        errorCrudRoles: action.payload.error,
        isGetRoleDetailLoading: false,
      };
    case RolesActionType.GetRoles:
      return {
        ...state,
        errorCrudRoles: null,
        isGetRolesLoading: true,
        metadata: null,
      };
    case RolesActionType.GetRolesSuccess:
      return {
        ...state,
        isGetRolesLoading: false,
        metadata: action.payload.meta,
        roles: keepRetrievedDataPage(state.roles, action.payload.data, action.payload.meta),
      };
    case RolesActionType.GetRolesError:
      return {
        ...state,
        errorCrudRoles: action.payload.error,
        isGetRolesLoading: false,
      };
    case RolesActionType.SetRolesQuery:
      return {
        ...state,
        query: action.payload.query,
      };
    case RolesActionType.CreateRole:
      return {
        ...state,
        errorCrudRoles: null,
        isCreateRoleLoading: true,
      };
    case RolesActionType.CreateRoleSuccess:
      return {
        ...state,
        isCreateRoleLoading: false,
      };
    case RolesActionType.CreateRoleError:
      return {
        ...state,
        errorCrudRoles: action.payload.error,
        isCreateRoleLoading: false,
      };
    case RolesActionType.UpdateRole:
      return {
        ...state,
        errorCrudRoles: null,
        isUpdateRoleLoading: true,
      };
    case RolesActionType.UpdateRoleSuccess:
      return {
        ...state,
        isUpdateRoleLoading: false,
      };
    case RolesActionType.UpdateRoleError:
      return {
        ...state,
        errorCrudRoles: action.payload.error,
        isUpdateRoleLoading: false,
      };
    case RolesActionType.DeleteRole:
      return {
        ...state,
        errorCrudRoles: null,
        isDeleteRoleLoading: action.payload.confirmed,
      };
    case RolesActionType.DeleteRoleSuccess:
      return {
        ...state,
        isDeleteRoleLoading: false,
        roles: [...state.roles.filter(role => role.id !== action.payload.roleId)],
      };
    case RolesActionType.DeleteRoleError:
      return {
        ...state,
        errorCrudRoles: action.payload.error,
        isDeleteRoleLoading: false,
      };
    default:
      return state;
  }
}
