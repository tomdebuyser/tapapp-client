import { Action } from 'redux';
import { ApiError } from '../../_http';
import { IUser, IUserForm } from '../_models/User';
import { HttpMetadataPagingResponse, HttpMetadataQuery } from '../../_http/HttpMetadata';

export enum UsersActionType {
  GetUsers = '[Users] GetUsers',
  GetUsersSuccess = '[Users] GetUsersSuccess',
  GetUsersError = '[Users] GetUsersError',
  SetUsersQuery = '[Users] SetUsersQuery',
  CreateUser = '[Users] CreateUser',
  CreateUserSuccess = '[Users] CreateUserSuccess',
  CreateUserError = '[Users] CreateUserError',
}

export class GetUsers implements Action<UsersActionType> {
  readonly type = UsersActionType.GetUsers;
}

export class GetUsersSuccess implements Action<UsersActionType> {
  readonly type = UsersActionType.GetUsersSuccess;
  constructor(public payload: { data: IUser[]; meta: HttpMetadataPagingResponse; skip?: number }) {}
}

export class GetUsersError implements Action<UsersActionType> {
  readonly type = UsersActionType.GetUsersError;
  constructor(public payload: { error: ApiError }) {}
}

export class SetUsersQuery implements Action<UsersActionType> {
  readonly type = UsersActionType.SetUsersQuery;
  constructor(public payload: { query: HttpMetadataQuery }) {}
}

export class CreateUser implements Action<UsersActionType> {
  readonly type = UsersActionType.CreateUser;
  constructor(public payload: IUserForm) {}
}

export class CreateUserSuccess implements Action<UsersActionType> {
  readonly type = UsersActionType.CreateUserSuccess;
}

export class CreateUserError implements Action<UsersActionType> {
  readonly type = UsersActionType.CreateUserError;
  constructor(public payload: { error: ApiError }) {}
}

export type UsersAction =
  | GetUsers
  | GetUsersSuccess
  | GetUsersError
  | SetUsersQuery
  | CreateUser
  | CreateUserSuccess
  | CreateUserError;
