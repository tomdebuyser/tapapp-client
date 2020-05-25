import { Action } from 'redux';
import { ApiError, HttpMetadataPagingResponse, HttpMetadataQuery } from '../../_http';
import { IUser, IUserForm } from '../_models';

export enum UsersActionType {
  CreateUser = '[Users] CreateUser',
  CreateUserError = '[Users] CreateUserError',
  CreateUserSuccess = '[Users] CreateUserSuccess',
  DeactivateUser = '[Users] DeactivateUser',
  DeactivateUserError = '[Users] DeactivateUserError',
  DeactivateUserSuccess = '[Users] DeactivateUserSuccess',
  GetUserDetail = '[Users] GetUserDetail',
  GetUserDetailError = '[Users] GetUserDetailError',
  GetUserDetailSuccess = '[Users] GetUserDetailSuccess',
  GetUsers = '[Users] GetUsers',
  GetUsersError = '[Users] GetUsersError',
  GetUsersSuccess = '[Users] GetUsersSuccess',
  ResendRegisterEmail = '[Users] ResendRegisterEmail',
  ResendRegisterEmailError = '[Users] ResendRegisterEmailError',
  ResendRegisterEmailSuccess = '[Users] ResendRegisterEmailSuccess',
  SetUsersQuery = '[Users] SetUsersQuery',
  UpdateUser = '[Users] UpdateUser',
  UpdateUserError = '[Users] UpdateUserError',
  UpdateUserSuccess = '[Users] UpdateUserSuccess',
}

export class GetUserDetail implements Action<UsersActionType> {
  readonly type = UsersActionType.GetUserDetail;
  constructor(public payload: { userId: string }) {}
}

export class GetUserDetailSuccess implements Action<UsersActionType> {
  readonly type = UsersActionType.GetUserDetailSuccess;
  constructor(public payload: { data: IUser }) {}
}

export class GetUserDetailError implements Action<UsersActionType> {
  readonly type = UsersActionType.GetUserDetailError;
  constructor(public payload: { error: ApiError }) {}
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
  constructor(public payload: { values: IUserForm }) {}
}

export class CreateUserSuccess implements Action<UsersActionType> {
  readonly type = UsersActionType.CreateUserSuccess;
}

export class CreateUserError implements Action<UsersActionType> {
  readonly type = UsersActionType.CreateUserError;
  constructor(public payload: { error: ApiError }) {}
}

export class UpdateUser implements Action<UsersActionType> {
  readonly type = UsersActionType.UpdateUser;
  constructor(public payload: { userId: string; values: IUserForm }) {}
}

export class UpdateUserSuccess implements Action<UsersActionType> {
  readonly type = UsersActionType.UpdateUserSuccess;
}

export class UpdateUserError implements Action<UsersActionType> {
  readonly type = UsersActionType.UpdateUserError;
  constructor(public payload: { error: ApiError }) {}
}

export class DeactivateUser implements Action<UsersActionType> {
  readonly type = UsersActionType.DeactivateUser;
  constructor(public payload: { confirmed?: boolean; user: IUser }) {}
}

export class DeactivateUserSuccess implements Action<UsersActionType> {
  readonly type = UsersActionType.DeactivateUserSuccess;
}

export class DeactivateUserError implements Action<UsersActionType> {
  readonly type = UsersActionType.DeactivateUserError;
  constructor(public payload: { error: ApiError }) {}
}

export class ResendRegisterEmail implements Action<UsersActionType> {
  readonly type = UsersActionType.ResendRegisterEmail;
  constructor(public payload: { userId: string }) {}
}

export class ResendRegisterEmailSuccess implements Action<UsersActionType> {
  readonly type = UsersActionType.ResendRegisterEmailSuccess;
}

export class ResendRegisterEmailError implements Action<UsersActionType> {
  readonly type = UsersActionType.ResendRegisterEmailError;
  constructor(public payload: { error: ApiError }) {}
}

export type UsersAction =
  | GetUserDetail
  | GetUserDetailSuccess
  | GetUserDetailError
  | GetUsers
  | GetUsersSuccess
  | GetUsersError
  | SetUsersQuery
  | CreateUser
  | CreateUserSuccess
  | CreateUserError
  | UpdateUser
  | UpdateUserSuccess
  | UpdateUserError
  | DeactivateUser
  | DeactivateUserSuccess
  | DeactivateUserError
  | ResendRegisterEmail
  | ResendRegisterEmailSuccess
  | ResendRegisterEmailError;
