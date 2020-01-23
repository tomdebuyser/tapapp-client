import { Action } from 'redux';
import { ApiError } from '../../_http';
import { IRole, IRoleForm } from '../_models/Role';
import { HttpMetadataPagingResponse, HttpMetadataQuery } from '../../_http/HttpMetadata';

export enum RolesActionType {
  CreateRole = '[Roles] CreateRole',
  CreateRoleError = '[Roles] CreateRoleError',
  CreateRoleSuccess = '[Roles] CreateRoleSuccess',
  GetRoles = '[Roles] GetRoles',
  GetRolesError = '[Roles] GetRolesError',
  GetRolesSuccess = '[Roles] GetRolesSuccess',
  SetRolesQuery = '[Roles] SetRolesQuery',
  UpdateRole = '[Roles] UpdateRole',
  UpdateRoleError = '[Roles] UpdateRoleError',
  UpdateRoleSuccess = '[Roles] UpdateRoleSuccess',
}

export class GetRoles implements Action<RolesActionType> {
  readonly type = RolesActionType.GetRoles;
}

export class GetRolesSuccess implements Action<RolesActionType> {
  readonly type = RolesActionType.GetRolesSuccess;
  constructor(public payload: { data: IRole[]; meta: HttpMetadataPagingResponse }) {}
}

export class GetRolesError implements Action<RolesActionType> {
  readonly type = RolesActionType.GetRolesError;
  constructor(public payload: { error: ApiError }) {}
}

export class SetRolesQuery implements Action<RolesActionType> {
  readonly type = RolesActionType.SetRolesQuery;
  constructor(public payload: { query: HttpMetadataQuery }) {}
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

export class UpdateRole implements Action<RolesActionType> {
  readonly type = RolesActionType.UpdateRole;
  constructor(public payload: { form: IRoleForm; roleId: string }) {}
}

export class UpdateRoleSuccess implements Action<RolesActionType> {
  readonly type = RolesActionType.UpdateRoleSuccess;
  constructor(public payload: { updatedRole: IRole }) {}
}

export class UpdateRoleError implements Action<RolesActionType> {
  readonly type = RolesActionType.UpdateRoleError;
  constructor(public payload: { error: ApiError }) {}
}

export type RolesAction =
  | GetRoles
  | GetRolesSuccess
  | GetRolesError
  | SetRolesQuery
  | CreateRole
  | CreateRoleSuccess
  | CreateRoleError
  | UpdateRole
  | UpdateRoleSuccess
  | UpdateRoleError;
