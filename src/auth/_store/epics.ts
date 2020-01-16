import { Epic } from 'redux-observable';
import { from, of } from 'rxjs';
import { map, catchError, switchMap, exhaustMap } from 'rxjs/operators';
import { push } from 'connected-react-router';
import { authActions } from '../../_store/actions';
import * as authApi from './api';
import { AuthActionType } from './actions';

export const choosePasswordEpic$: Epic = action$ =>
  action$.ofType(AuthActionType.ChoosePassword).pipe(
    switchMap(({ payload }: authActions.ChoosePassword) =>
      from(authApi.choosePassword(payload)).pipe(
        map(() => new authActions.ChoosePasswordSuccess()),
        catchError(error => of(new authActions.ChoosePasswordError({ error }))),
      ),
    ),
  );

export const choosePasswordSuccessEpic$: Epic = action$ =>
  action$.ofType(AuthActionType.ChoosePasswordSuccess).pipe(switchMap(() => of(push('/auth/login'))));

export const loginEpic$: Epic = action$ =>
  action$.ofType(AuthActionType.Login).pipe(
    exhaustMap(({ payload }: authActions.Login) =>
      from(authApi.login(payload)).pipe(
        map(user => new authActions.LoginSuccess({ user })),
        catchError(error => of(new authActions.LoginError({ error }))),
      ),
    ),
  );

export const loginSuccessEpic$: Epic = action$ =>
  action$.ofType(AuthActionType.LoginSuccess).pipe(switchMap(() => of(push('/users'))));

export const logoutEpic$: Epic = action$ =>
  action$.ofType(AuthActionType.Logout).pipe(
    exhaustMap(() =>
      from(authApi.logout()).pipe(
        map(() => new authActions.LogoutSuccess()),
        catchError(error => of(new authActions.LogoutError({ error }))),
      ),
    ),
  );

export const logoutSuccessEpic$: Epic = action$ =>
  action$.ofType(AuthActionType.LogoutSuccess).pipe(switchMap(() => of(push('/auth/login'))));

export const requestPasswordResetEpic$: Epic = action$ =>
  action$.ofType(AuthActionType.RequestPasswordReset).pipe(
    exhaustMap(({ payload }: authActions.RequestPasswordReset) =>
      from(authApi.requestPasswordReset(payload)).pipe(
        map(() => new authActions.RequestPasswordResetSuccess()),
        catchError(error => of(new authActions.RequestPasswordResetError({ error }))),
      ),
    ),
  );

export const requestPasswordResetSuccessEpic$: Epic = action$ =>
  action$.ofType(AuthActionType.RequestPasswordResetSuccess).pipe(switchMap(() => of(push('/auth/login'))));

export const authenticateEpic$: Epic = action$ =>
  action$.ofType(AuthActionType.Authenticate).pipe(
    exhaustMap(({ payload }: authActions.Authenticate) =>
      from(authApi.authenticate()).pipe(
        map(user => new authActions.AuthenticateSuccess({ user, pathname: payload.pathname })),
        catchError(error => of(new authActions.AuthenticateError({ error }))),
      ),
    ),
  );

export const authenticateSuccessEpic$: Epic = action$ =>
  action$
    .ofType(AuthActionType.AuthenticateSuccess)
    .pipe(switchMap(({ payload }: authActions.AuthenticateSuccess) => of(push(payload.pathname))));

const AuthEpics = [
  authenticateEpic$,
  authenticateSuccessEpic$,
  choosePasswordEpic$,
  choosePasswordSuccessEpic$,
  loginEpic$,
  loginSuccessEpic$,
  logoutEpic$,
  logoutSuccessEpic$,
  requestPasswordResetEpic$,
  requestPasswordResetSuccessEpic$,
];

export default AuthEpics;
