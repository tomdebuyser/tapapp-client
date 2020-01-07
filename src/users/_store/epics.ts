import { Epic } from 'redux-observable';
import { from, of } from 'rxjs';
import { map, catchError, exhaustMap } from 'rxjs/operators';
import { UsersActionType, GetUsersSuccess, GetUsersError } from '../_store/actions';
import * as usersApi from './api';

export const GetUsersEpic$: Epic = action$ =>
  action$.ofType(UsersActionType.GetUsers).pipe(
    exhaustMap(() =>
      from(usersApi.getUsers()).pipe(
        map(data => new GetUsersSuccess({ data })),
        catchError(error => of(new GetUsersError({ error }))),
      ),
    ),
  );

const UsersEpics = [GetUsersEpic$];

export default UsersEpics;
