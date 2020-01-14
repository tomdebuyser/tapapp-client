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

export const LoginEpic$: Epic = action$ =>
  action$.ofType(AuthActionType.Login).pipe(
    exhaustMap(({ payload }: authActions.Login) =>
      from(authApi.login(payload)).pipe(
        map(user => new authActions.LoginSuccess({ user })),
        catchError(error => of(new authActions.LoginError({ error }))),
      ),
    ),
  );

export const LoginSuccessEpic$: Epic = action$ =>
  action$.ofType(AuthActionType.LoginSuccess).pipe(switchMap(() => of(push('/users'))));

export const LogoutEpic$: Epic = action$ =>
  action$.ofType(AuthActionType.Logout).pipe(
    exhaustMap(
      () => from(authApi.logout()).pipe(map(() => new authActions.LogoutSuccess())),
      catchError(error => of(new authActions.LogoutError({ error }))),
    ),
  );

export const LogoutSuccessEpic$: Epic = action$ =>
  action$.ofType(AuthActionType.LogoutSuccess).pipe(switchMap(() => of(push('/auth/login'))));

const AuthEpics = [resetPasswordEpic$, resetPasswordSuccessEpic$, LoginEpic$, LoginSuccessEpic$, LogoutEpic$, LogoutSuccessEpic$];

export default AuthEpics;
