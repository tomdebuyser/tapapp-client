import { Epic } from 'redux-observable';
import { from, of } from 'rxjs';
import { map, catchError, exhaustMap, switchMap } from 'rxjs/operators';
import { push } from 'connected-react-router';
import {
  UsersActionType,
  GetUsersSuccess,
  GetUsersError,
  CreateUser,
  CreateUserSuccess,
  CreateUserError,
} from '../_store/actions';
import * as usersApi from './api';

export const GetUsersEpic$: Epic = action$ =>
  action$.ofType(UsersActionType.GetUsers).pipe(
    exhaustMap(() =>
      from(usersApi.getUsers()).pipe(
        map(({ data, meta }) => new GetUsersSuccess({ data, meta })),
        catchError(error => of(new GetUsersError({ error }))),
      ),
    ),
  );

export const CreateUserEpic$: Epic = action$ =>
  action$.ofType(UsersActionType.CreateUser).pipe(
    exhaustMap(({ payload }: CreateUser) =>
      from(usersApi.createUser(payload.email, payload.firstName, payload.lastName)).pipe(
        map(() => new CreateUserSuccess()),
        catchError(error => of(new CreateUserError({ error }))),
      ),
    ),
  );

export const CreateUserSuccessEpic$: Epic = action$ =>
  action$.ofType(UsersActionType.CreateUserSuccess).pipe(switchMap(() => of(push('/users'))));

const UsersEpics = [GetUsersEpic$, CreateUserEpic$, CreateUserSuccessEpic$];

export default UsersEpics;
