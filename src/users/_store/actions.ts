import { Action } from 'redux';
import { ApiError, HttpMetadataPagingResponse, HttpMetadataQuery } from '../../_http';
import { IUser, IUserForm } from '../_models';

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
  ResendRegisterEmail = '[Users] ResendRegisterEmail',
  ResendRegisterEmailError = '[Users] ResendRegisterEmailError',
  ResendRegisterEmailSuccess = '[Users] ResendRegisterEmailSuccess',
  SetUsersQuery = '[Users] SetUsersQuery',
  UpdateUser = '[Users] UpdateUser',
  UpdateUserError = '[Users] UpdateUserError',
  UpdateUserSuccess = '[Users] UpdateUserSuccess',
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

export class UpdateUser implements Action<UsersActionType> {
  readonly type = UsersActionType.UpdateUser;
  constructor(public payload: { form: IUserForm; userId: string }) {}
}

export class UpdateUserSuccess implements Action<UsersActionType> {
  readonly type = UsersActionType.UpdateUserSuccess;
  constructor(public payload: { updatedUser: IUser }) {}
}

export class UpdateUserError implements Action<UsersActionType> {
  readonly type = UsersActionType.UpdateUserError;
  constructor(public payload: { error: ApiError }) {}
}

export class InactivateUser implements Action<UsersActionType> {
  readonly type = UsersActionType.InactivateUser;
  constructor(public payload: { confirmed?: boolean; user: IUser }) {}
}

export class InactivateUserSuccess implements Action<UsersActionType> {
  readonly type = UsersActionType.InactivateUserSuccess;
  constructor(public payload: { updatedUser: IUser }) {}
}

export class InactivateUserError implements Action<UsersActionType> {
  readonly type = UsersActionType.InactivateUserError;
  constructor(public payload: { error: ApiError }) {}
}

export class ResendRegisterEmail implements Action<UsersActionType> {
  readonly type = UsersActionType.ResendRegisterEmail;
  constructor(public payload: { userId: string }) {}
}

export class ResendRegisterEmailSuccess implements Action<UsersActionType> {
  readonly type = UsersActionType.ResendRegisterEmailSuccess;
  constructor(public payload: { updatedUser: IUser }) {}
}

export class ResendRegisterEmailError implements Action<UsersActionType> {
  readonly type = UsersActionType.ResendRegisterEmailError;
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
  | UpdateUser
  | UpdateUserSuccess
  | UpdateUserError
  | InactivateUser
  | InactivateUserSuccess
  | InactivateUserError
  | ResendRegisterEmail
  | ResendRegisterEmailSuccess
  | ResendRegisterEmailError;
