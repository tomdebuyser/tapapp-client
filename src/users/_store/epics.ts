import { Epic } from 'redux-observable';
import { from, of } from 'rxjs';
import { map, catchError, exhaustMap, switchMap } from 'rxjs/operators';
import { push } from 'connected-react-router';
import { usersActions } from '../../_store/actions';
import { UsersActionType } from './actions';
import * as usersApi from './api';

export const GetUsersEpic$: Epic = action$ =>
  action$.ofType(UsersActionType.GetUsers).pipe(
    exhaustMap(() =>
      from(usersApi.getUsers()).pipe(
        map(({ data, meta }) => new usersActions.GetUsersSuccess({ data, meta })),
        catchError(error => of(new usersActions.GetUsersError({ error }))),
      ),
    ),
  );

export const CreateUserEpic$: Epic = action$ =>
  action$.ofType(UsersActionType.CreateUser).pipe(
    exhaustMap(({ payload }: usersActions.CreateUser) =>
      from(usersApi.createUser(payload)).pipe(
        map(() => new usersActions.CreateUserSuccess()),
        catchError(error => of(new usersActions.CreateUserError({ error }))),
      ),
    ),
  );

export const CreateUserSuccessEpic$: Epic = action$ =>
  action$.ofType(usersActions.UsersActionType.CreateUserSuccess).pipe(switchMap(() => of(push('/users'))));

const UsersEpics = [GetUsersEpic$, CreateUserEpic$, CreateUserSuccessEpic$];

export default UsersEpics;
