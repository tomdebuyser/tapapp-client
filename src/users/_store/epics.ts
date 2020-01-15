import { Epic } from 'redux-observable';
import { from, of } from 'rxjs';
import { map, catchError, exhaustMap, switchMap, filter } from 'rxjs/operators';
import { push } from 'connected-react-router';
import { usersActions, modalActions } from '../../_store/actions';
import { usersSelectors } from '../../_store/selectors';
import { translations } from '../../_translations';
import { UsersActionType, GetUsers } from './actions';
import * as usersApi from './api';

export const getUsersEpic$: Epic = (action$, state$) =>
  action$.ofType(UsersActionType.GetUsers).pipe(
    exhaustMap(() => {
      const query = usersSelectors.query(state$.value);
      return from(usersApi.getUsers(query)).pipe(
        map(({ data, meta }) => new usersActions.GetUsersSuccess({ data, meta })),
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
  action$.ofType(UsersActionType.CreateUserSuccess).pipe(switchMap(() => of(push('/users'))));

export const removeUserWithConfirmationEpic$: Epic = action$ =>
  action$.ofType(UsersActionType.RemoveUser).pipe(
    filter((action: usersActions.RemoveUser) => !action.confirmed),
    map(({ user }: usersActions.RemoveUser) => {
      return new modalActions.ShowConfirmationModalAction({
        data: {
          title: translations.getLabel('USERS.REMOVE.TITLE'),
          content: translations.getLabel('USERS.REMOVE.CONTENT', { user: user.email }),
          confirmText: translations.getLabel('USERS.REMOVE.CONFIRM'),
          confirmAction: () => new usersActions.RemoveUser(user, true),
        },
      });
    }),
  );

export const removeUserEpic$: Epic = action$ =>
  action$.ofType(UsersActionType.RemoveUser).pipe(
    filter((action: usersActions.RemoveUser) => action.confirmed),
    exhaustMap(({ user }: usersActions.RemoveUser) =>
      from(usersApi.removeUser(user)).pipe(
        map(() => new usersActions.RemoveUserSuccess()),
        catchError(error => of(new usersActions.RemoveUserError(error))),
      ),
    ),
  );

export const removeUserSuccessEpic$: Epic = action$ =>
  action$.ofType(UsersActionType.RemoveUserSuccess).pipe(switchMap(() => of(new usersActions.GetUsers())));

const UsersEpics = [
  getUsersEpic$,
  setUsersQueryEpic$,
  createUserEpic$,
  createUserSuccessEpic$,
  removeUserWithConfirmationEpic$,
  removeUserEpic$,
  removeUserSuccessEpic$,
];

export default UsersEpics;
