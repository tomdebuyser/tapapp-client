import { Epic } from 'redux-observable';
import { from, of } from 'rxjs';
import { map, tap, catchError, exhaustMap, switchMap, filter } from 'rxjs/operators';
import { push } from 'connected-react-router';
import { toast } from 'react-toastify';
import { usersActions, modalActions } from '../../_store/actions';
import { usersSelectors } from '../../_store/selectors';
import { translations } from '../../_translations';
import { UsersActionType } from './actions';
import * as usersApi from './api';

const getUserDetailEpic$: Epic = action$ =>
  action$.ofType(UsersActionType.GetUserDetail).pipe(
    exhaustMap(({ payload }: usersActions.GetUserDetail) => {
      return from(usersApi.getUserDetail(payload.userId)).pipe(
        map(data => new usersActions.GetUserDetailSuccess({ data })),
        catchError(error => of(new usersActions.GetUserDetailError({ error }))),
      );
    }),
  );

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
      from(usersApi.createUser(payload.values)).pipe(
        tap(() => toast.success(translations.getLabel('USERS.TOASTER.USER_CREATED'))),
        switchMap(() => of(new usersActions.CreateUserSuccess(), push('/users'))),
        catchError(error => of(new usersActions.CreateUserError({ error }))),
      ),
    ),
  );

const updateUserEpic$: Epic = action$ =>
  action$.ofType(UsersActionType.UpdateUser).pipe(
    exhaustMap(({ payload }: usersActions.UpdateUser) =>
      from(usersApi.updateUser(payload.userId, payload.values)).pipe(
        tap(() => toast.success(translations.getLabel('USERS.TOASTER.USER_UPDATED'))),
        switchMap(() => of(new usersActions.UpdateUserSuccess(), new usersActions.GetUserDetail({ userId: payload.userId }))),
        catchError(error => of(new usersActions.UpdateUserError({ error }))),
      ),
    ),
  );

const deactivateUserWithConfirmationEpic$: Epic = action$ =>
  action$.ofType(UsersActionType.DeactivateUser).pipe(
    filter(({ payload }: usersActions.DeactivateUser) => !payload.confirmed),
    map(({ payload }: usersActions.DeactivateUser) => {
      return new modalActions.ShowConfirmationModal({
        confirmAction: () => new usersActions.DeactivateUser({ confirmed: true, user: payload.user }),
        confirmText: translations.getLabel('USERS.DEACTIVATE.CONFIRM'),
        content: translations.getLabel('USERS.DEACTIVATE.CONTENT'),
        title: payload.user.email,
      });
    }),
  );

const deactivateUserEpic$: Epic = action$ =>
  action$.ofType(UsersActionType.DeactivateUser).pipe(
    filter(({ payload }: usersActions.DeactivateUser) => payload.confirmed),
    exhaustMap(({ payload }: usersActions.DeactivateUser) =>
      from(usersApi.deactivateUser(payload.user.id)).pipe(
        switchMap(() =>
          of(new usersActions.DeactivateUserSuccess(), new usersActions.GetUserDetail({ userId: payload.user.id })),
        ),
        catchError(error => of(new usersActions.DeactivateUserError({ error }))),
      ),
    ),
  );

const resendRegisterEmailEpic$: Epic = action$ =>
  action$.ofType(UsersActionType.ResendRegisterEmail).pipe(
    exhaustMap(({ payload }: usersActions.ResendRegisterEmail) =>
      from(usersApi.resendRegisterEmail(payload.userId)).pipe(
        switchMap(() =>
          of(new usersActions.ResendRegisterEmailSuccess(), new usersActions.GetUserDetail({ userId: payload.userId })),
        ),
        catchError(error => of(new usersActions.ResendRegisterEmailError({ error }))),
      ),
    ),
  );

export default [
  getUserDetailEpic$,
  getUsersEpic$,
  setUsersQueryEpic$,
  createUserEpic$,
  updateUserEpic$,
  deactivateUserWithConfirmationEpic$,
  deactivateUserEpic$,
  resendRegisterEmailEpic$,
];
