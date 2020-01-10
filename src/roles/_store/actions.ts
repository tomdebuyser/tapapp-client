import { Action } from 'redux';
import { ApiError } from '../../_http';
import { IRole, IRoleForm } from '../_models/Role';
import { HttpMetadataPagingResponse, HttpMetadataQuery } from '../../_http/HttpMetadata';

export enum RolesActionType {
  GetRoles = '[Roles] GetRoles',
  GetRolesSuccess = '[Roles] GetRolesSuccess',
  GetRolesError = '[Roles] GetRolesError',
  CreateRole = '[Roles] CreateRole',
  CreateRoleSuccess = '[Roles] CreateRoleSuccess',
  CreateRoleError = '[Roles] CreateRoleError',
}

export class GetRoles implements Action<RolesActionType> {
  readonly type = RolesActionType.GetRoles;
  constructor(public query?: HttpMetadataQuery) {}
}

export class GetRolesSuccess implements Action<RolesActionType> {
  readonly type = RolesActionType.GetRolesSuccess;
  constructor(public payload: { data: IRole[]; meta: HttpMetadataPagingResponse }) {}
}

export class GetRolesError implements Action<RolesActionType> {
  readonly type = RolesActionType.GetRolesError;
  constructor(public payload: { error: ApiError }) {}
}

export class CreateRole implements Action<RolesActionType> {
  readonly type = RolesActionType.CreateRole;
  constructor(public payload: IRoleForm) {}
}

export class CreateRoleSuccess implements Action<RolesActionType> {
  readonly type = RolesActionType.CreateRoleSuccess;
}

export class CreateRoleError implements Action<RolesActionType> {
  readonly type = RolesActionType.CreateRoleError;
  constructor(public payload: { error: ApiError }) {}
}

export type RolesAction = GetRoles | GetRolesSuccess | GetRolesError | CreateRole | CreateRoleSuccess | CreateRoleError;
