import { Epic } from 'redux-observable';
import { from, of } from 'rxjs';
import { map, catchError, exhaustMap, switchMap, filter } from 'rxjs/operators';
import { push } from 'connected-react-router';
import { usersActions, modalActions } from '../../_store/actions';
import { usersSelectors } from '../../_store/selectors';
import { translations } from '../../_translations';
import { UsersActionType } from './actions';
import * as usersApi from './api';

const getUsersEpic$: Epic = (action$, state$) =>
  action$.ofType(UsersActionType.GetUsers).pipe(
    exhaustMap(() => {
      const query = usersSelectors.query(state$.value);
      return from(usersApi.getUsers(query)).pipe(
        map(({ data, meta }) => new usersActions.GetUsersSuccess({ data, meta })),
        catchError(error => of(new usersActions.GetUsersError({ error }))),
      );
    }),
  );

const setUsersQueryEpic$: Epic = action$ =>
  action$.ofType(UsersActionType.SetUsersQuery).pipe(map(() => new usersActions.GetUsers()));

const createUserEpic$: Epic = action$ =>
  action$.ofType(UsersActionType.CreateUser).pipe(
    switchMap(({ payload }: usersActions.CreateUser) =>
      from(usersApi.createUser(payload)).pipe(
        map(() => new usersActions.CreateUserSuccess()),
        catchError(error => of(new usersActions.CreateUserError({ error }))),
      ),
    ),
  );

const createUserSuccessEpic$: Epic = action$ =>
  action$.ofType(UsersActionType.CreateUserSuccess).pipe(switchMap(() => of(push('/users'))));

const inactivateUserWithConfirmationEpic$: Epic = action$ =>
  action$.ofType(UsersActionType.InactivateUser).pipe(
    filter(({ payload }: usersActions.InactivateUser) => !payload.confirmed),
    map(({ payload }: usersActions.InactivateUser) => {
      return new modalActions.ShowConfirmationModal({
        title: translations.getLabel('USERS.REMOVE.TITLE'),
        content: translations.getLabel('USERS.REMOVE.CONTENT', { user: payload.user.email }),
        confirmText: translations.getLabel('USERS.REMOVE.CONFIRM'),
        confirmAction: () => new usersActions.InactivateUser({ user: payload.user, confirmed: true }),
      });
    }),
  );

const inactivateUserEpic$: Epic = action$ =>
  action$.ofType(UsersActionType.InactivateUser).pipe(
    filter(({ payload }: usersActions.InactivateUser) => payload.confirmed),
    exhaustMap(({ payload }: usersActions.InactivateUser) =>
      from(usersApi.inactivateUser(payload.user)).pipe(
        map(updatedUser => new usersActions.InactivateUserSuccess({ updatedUser })),
        catchError(error => of(new usersActions.InactivateUserError({ error }))),
      ),
    ),
  );

export default [
  getUsersEpic$,
  setUsersQueryEpic$,
  createUserEpic$,
  createUserSuccessEpic$,
  inactivateUserWithConfirmationEpic$,
  inactivateUserEpic$,
];
