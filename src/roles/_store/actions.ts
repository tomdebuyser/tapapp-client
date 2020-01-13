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
  SetRolesQuery = '[Roles] SetRolesQuery'
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

export type RolesAction =
  | GetRoles
  | GetRolesSuccess
  | GetRolesError
  | SetRolesQuery
  | CreateRole
  | CreateRoleSuccess
  | CreateRoleError;
