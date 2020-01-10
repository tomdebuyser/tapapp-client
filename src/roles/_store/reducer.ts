import { IRole } from '../_models/Role';
import { ApiError } from '../../_http';
import { HttpMetadataPagingResponse } from '../../_http/HttpMetadata';
import { RolesAction, RolesActionType } from './actions';

export interface RolesState {
  isCreateRoleLoading: boolean;
  isGetRolesLoading: boolean;
  errorCreateRole?: ApiError;
  errorGetRoles?: ApiError;
  metadata?: HttpMetadataPagingResponse;
  roles?: IRole[];
}

const initialState: RolesState = {
  isGetRolesLoading: false,
  isCreateRoleLoading: false,
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
    case RolesActionType.GetRolesSuccess:
      return {
        ...state,
        isGetRolesLoading: false,
        roles: action.payload.data,
        metadata: action.payload.meta,
      };
    case RolesActionType.GetRolesError:
      return {
        ...state,
        isGetRolesLoading: false,
        errorGetRoles: action.payload.error,
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
    default:
      return state;
  }
}
