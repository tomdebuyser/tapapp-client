import { Action } from 'redux';
import { ApiError } from '../../_http';
import { IUser } from '../_models/User';

export enum ActionType {
  GetUsers = '[Users] GetUsers',
  GetUsersSuccess = '[Users] GetUsersSuccess',
  GetUsersError = '[Users] GetUsersError',
}

export class GetUsersAction implements Action<ActionType> {
  readonly type = ActionType.GetUsers;
}

export class GetUsersSuccessAction implements Action<ActionType> {
  readonly type = ActionType.GetUsersSuccess;
  constructor(public payload: { data: IUser[] }) {}
}

export class GetUsersErrorAction implements Action<ActionType> {
  readonly type = ActionType.GetUsersError;
  constructor(public payload: { error: ApiError }) {}
}

export type Actions = GetUsersAction | GetUsersSuccessAction | GetUsersErrorAction;
