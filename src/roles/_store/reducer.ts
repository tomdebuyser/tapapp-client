import { IRole } from '../_models/Role';
import { ApiError } from '../../_http';
import { HttpMetadataPagingResponse, HttpMetadataQuery } from '../../_http/HttpMetadata';
import { RolesAction, RolesActionType } from './actions';

export interface RolesState {
  errorCreateRole?: ApiError;
  errorGetRoles?: ApiError;
  isCreateRoleLoading: boolean;
  isGetRolesLoading: boolean;
  metadata?: HttpMetadataPagingResponse;
  query?: HttpMetadataQuery;
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
    case RolesActionType.GetRolesSuccess: {
      let currentData = state.roles || [];
      if (!action.payload.meta.skip) currentData = []; // Start overnew when the offset was reset
      const updatedIds = action.payload.data.map(value => value.id);
      return {
        ...state,
        isGetRolesLoading: false,
        roles: [...currentData.filter(value => !updatedIds.includes(value.id)), ...action.payload.data],
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
    default:
      return state;
  }
}
