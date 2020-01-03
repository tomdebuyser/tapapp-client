import { Epic } from 'redux-observable';
import { from, of } from 'rxjs';
import { map, catchError, exhaustMap } from 'rxjs/operators';
import * as usersApi from './api';
import { ActionType, GetUsersSuccessAction, GetUsersErrorAction } from './actions';

export const GetUsersEpic$: Epic = action$ =>
  action$.ofType(ActionType.GetUsers).pipe(
    exhaustMap(() =>
      from(usersApi.getUsers()).pipe(
        map(data => new GetUsersSuccessAction({ data })),
        catchError(error => of(new GetUsersErrorAction({ error }))),
      ),
    ),
  );

const UsersEpics = [GetUsersEpic$];

export default UsersEpics;
