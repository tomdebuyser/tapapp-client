import { IRole } from '../_models';
import { ApiError, HttpMetadataPagingResponse, HttpMetadataQuery } from '../../_http';
import { insertUpdatedData } from '../../_utils/objectHelpers';
import { RolesAction, RolesActionType } from './actions';

export interface RolesState {
  errorCreateRole?: ApiError;
  errorDeleteRole?: ApiError;
  errorGetRoles?: ApiError;
  errorUpdateRole?: ApiError;
  isCreateRoleLoading: boolean;
  isDeleteRoleLoading: boolean;
  isGetRolesLoading: boolean;
  isUpdateRoleLoading: boolean;
  metadata?: HttpMetadataPagingResponse;
  query?: HttpMetadataQuery;
  roles?: IRole[];
}

const initialState: RolesState = {
  isCreateRoleLoading: false,
  isDeleteRoleLoading: false,
  isGetRolesLoading: false,
  isUpdateRoleLoading: false,
};

export default function reducer(state = initialState, action: RolesAction): RolesState {
  switch (action.type) {
    case RolesActionType.GetRoles:
      return {
        ...state,
        isGetRolesLoading: true,
        errorGetRoles: null,
        metadata: null,
      };
    case RolesActionType.GetRolesSuccess: {
      let currentData = state.roles || [];
      if (!action.payload.meta.skip) currentData = []; // Start overnew when the offset was reset
      return {
        ...state,
        isGetRolesLoading: false,
        roles: insertUpdatedData(currentData, action.payload.data),
        metadata: action.payload.meta,
      };
    }
    case RolesActionType.GetRolesError:
      return {
        ...state,
        isGetRolesLoading: false,
        errorGetRoles: action.payload.error,
      };
    case RolesActionType.SetRolesQuery:
      return {
        ...state,
        query: action.payload.query,
      };
    case RolesActionType.CreateRole:
      return {
        ...state,
        isCreateRoleLoading: true,
        errorCreateRole: null,
      };
    case RolesActionType.CreateRoleSuccess:
      return {
        ...state,
        isCreateRoleLoading: false,
      };
    case RolesActionType.CreateRoleError:
      return {
        ...state,
        isCreateRoleLoading: false,
        errorCreateRole: action.payload.error,
      };
    case RolesActionType.UpdateRole:
      return {
        ...state,
        isUpdateRoleLoading: true,
        errorUpdateRole: null,
      };
    case RolesActionType.UpdateRoleSuccess:
      return {
        ...state,
        isUpdateRoleLoading: false,
        roles: insertUpdatedData(state.roles, [action.payload.updatedRole]),
      };
    case RolesActionType.UpdateRoleError:
      return {
        ...state,
        isUpdateRoleLoading: false,
        errorUpdateRole: action.payload.error,
      };
    case RolesActionType.DeleteRole:
      return {
        ...state,
        isDeleteRoleLoading: action.payload.confirmed,
        errorDeleteRole: null,
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
        isDeleteRoleLoading: false,
        errorDeleteRole: action.payload.error,
      };
    default:
      return state;
  }
}
