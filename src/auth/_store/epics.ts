import { Epic } from 'redux-observable';
import { from, of } from 'rxjs';
import { map, catchError, switchMap, exhaustMap } from 'rxjs/operators';
import { push } from 'connected-react-router';
import { authActions } from '../../_store/actions';
import * as authApi from './api';
import { AuthActionType } from './actions';

export const resetPasswordEpic$: Epic = action$ =>
  action$.ofType(AuthActionType.ResetPassword).pipe(
    switchMap(({ payload }: authActions.ResetPassword) =>
      from(authApi.resetPassword(payload)).pipe(
        map(() => new authActions.ResetPasswordSuccess()),
        catchError(error => of(new authActions.ResetPasswordError({ error }))),
      ),
    ),
  );

export const resetPasswordSuccessEpic$: Epic = action$ =>
  action$.ofType(AuthActionType.ResetPasswordSuccess).pipe(switchMap(() => of(push('/auth/login'))));

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
    exhaustMap(
      () => from(authApi.logout()).pipe(map(() => new authActions.LogoutSuccess())),
      catchError(error => of(new authActions.LogoutError({ error }))),
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

const AuthEpics = [
  resetPasswordEpic$,
  resetPasswordSuccessEpic$,
  loginEpic$,
  loginSuccessEpic$,
  logoutEpic$,
  logoutSuccessEpic$,
  requestPasswordResetEpic$,
  requestPasswordResetSuccessEpic$,
];

export default AuthEpics;
