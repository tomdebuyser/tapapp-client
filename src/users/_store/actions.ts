import { Action } from 'redux';
import { ApiError } from '../../_http';
import { IUser } from '../_models/User';

export enum UsersActionType {
  GetUsers = '[Users] GetUsers',
  GetUsersSuccess = '[Users] GetUsersSuccess',
  GetUsersError = '[Users] GetUsersError',
}

export class GetUsers implements Action<UsersActionType> {
  readonly type = UsersActionType.GetUsers;
}

export class GetUsersSuccess implements Action<UsersActionType> {
  readonly type = UsersActionType.GetUsersSuccess;
  constructor(public payload: { data: IUser[] }) {}
}

export class GetUsersError implements Action<UsersActionType> {
  readonly type = UsersActionType.GetUsersError;
  constructor(public payload: { error: ApiError }) {}
}

export type UsersAction = GetUsers | GetUsersSuccess | GetUsersError;
