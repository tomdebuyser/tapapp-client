import { Epic } from 'redux-observable';
import { from, of } from 'rxjs';
import { map, catchError, exhaustMap, switchMap } from 'rxjs/operators';
import { push } from 'connected-react-router';
import { usersActions } from '../../_store/actions';
import { usersSelectors } from '../../_store/selectors';
import { UsersActionType } from './actions';
import * as usersApi from './api';

export const getUsersEpic$: Epic = (action$, state$) =>
  action$.ofType(UsersActionType.GetUsers).pipe(
    exhaustMap(() => {
      const query = usersSelectors.query(state$.value);
      return from(usersApi.getUsers(query)).pipe(
        map(
          ({ data, meta }) => new usersActions.GetUsersSuccess({ data, meta: { ...meta, skip: query?.skip }, skip: query?.skip }),
        ),
        catchError(error => of(new usersActions.GetUsersError({ error }))),
      );
    }),
  );

export const setUsersQueryEpic$: Epic = action$ =>
  action$.ofType(UsersActionType.SetUsersQuery).pipe(map(() => new usersActions.GetUsers()));

export const createUserEpic$: Epic = action$ =>
  action$.ofType(UsersActionType.CreateUser).pipe(
    switchMap(({ payload }: usersActions.CreateUser) =>
      from(usersApi.createUser(payload)).pipe(
        map(() => new usersActions.CreateUserSuccess()),
        catchError(error => of(new usersActions.CreateUserError({ error }))),
      ),
    ),
  );

export const createUserSuccessEpic$: Epic = action$ =>
  action$.ofType(usersActions.UsersActionType.CreateUserSuccess).pipe(switchMap(() => of(push('/users'))));

const UsersEpics = [getUsersEpic$, setUsersQueryEpic$, createUserEpic$, createUserSuccessEpic$];

export default UsersEpics;
