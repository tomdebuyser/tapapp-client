import { Action } from 'redux';
import { ApiError } from '../../_http';
import { IUser, IUserForm } from '../_models/User';
import { HttpMetadataPagingResponse, HttpMetadataQuery } from '../../_http/HttpMetadata';

export enum UsersActionType {
  CreateUser = '[Users] CreateUser',
  CreateUserError = '[Users] CreateUserError',
  CreateUserSuccess = '[Users] CreateUserSuccess',
  GetUsers = '[Users] GetUsers',
  GetUsersError = '[Users] GetUsersError',
  GetUsersSuccess = '[Users] GetUsersSuccess',
  InactivateUser = '[Users] InactivateUser',
  InactivateUserError = '[Users] InactivateUserError',
  InactivateUserSuccess = '[Users] InactivateUserSuccess',
  SetUsersQuery = '[Users] SetUsersQuery',
}

export class GetUsers implements Action<UsersActionType> {
  readonly type = UsersActionType.GetUsers;
}

export class GetUsersSuccess implements Action<UsersActionType> {
  readonly type = UsersActionType.GetUsersSuccess;
  constructor(public payload: { data: IUser[]; meta: HttpMetadataPagingResponse }) {}
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

export class InactivateUser implements Action<UsersActionType> {
  readonly type = UsersActionType.InactivateUser;
  constructor(public payload: { confirmed?: boolean; user: IUser }) {}
}

export class InactivateUserSuccess implements Action<UsersActionType> {
  readonly type = UsersActionType.InactivateUserSuccess;
}

export class InactivateUserError implements Action<UsersActionType> {
  readonly type = UsersActionType.InactivateUserError;
  constructor(public payload: { error: ApiError }) {}
}

export type UsersAction =
  | GetUsers
  | GetUsersSuccess
  | GetUsersError
  | SetUsersQuery
  | CreateUser
  | CreateUserSuccess
  | CreateUserError
  | InactivateUser
  | InactivateUserSuccess
  | InactivateUserError;
