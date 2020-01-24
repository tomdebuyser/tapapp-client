import { Epic } from 'redux-observable';
import { from, of } from 'rxjs';
import { map, catchError, switchMap, exhaustMap, filter } from 'rxjs/operators';
import { push } from 'connected-react-router';
import { authActions } from '../../_store/actions';
import { HttpStatus } from '../../_http';
import * as authApi from './api';
import { AuthActionType } from './actions';

const unauthorizedEpic$: Epic = action$ =>
  action$.pipe(
    filter(action => action?.payload?.error?.statusCode === HttpStatus.Unauthorized),
    map(() => new authActions.LogoutSuccess()),
  );

const authenticateEpic$: Epic = action$ =>
  action$.ofType(AuthActionType.Authenticate).pipe(
    exhaustMap(() =>
      from(authApi.authenticate()).pipe(
        map(profile => new authActions.AuthenticateSuccess({ profile })),
        catchError(() => of(new authActions.AuthenticateError({}))),
      ),
    ),
  );

const authenticateSuccessEpic$: Epic = action$ =>
  action$.ofType(AuthActionType.AuthenticateSuccess).pipe(
    filter(({ payload }: authActions.AuthenticateSuccess) => !!payload.pathname),
    switchMap(({ payload }: authActions.AuthenticateSuccess) => of(push(payload.pathname))),
  );

const choosePasswordEpic$: Epic = action$ =>
  action$.ofType(AuthActionType.ChoosePassword).pipe(
    switchMap(({ payload }: authActions.ChoosePassword) =>
      from(authApi.choosePassword(payload.values, payload.token)).pipe(
        map(() => new authActions.ChoosePasswordSuccess()),
        catchError(error => of(new authActions.ChoosePasswordError({ error }))),
      ),
    ),
  );

const choosePasswordSuccessEpic$: Epic = action$ =>
  action$.ofType(AuthActionType.ChoosePasswordSuccess).pipe(switchMap(() => of(push('/auth/login'))));

const loginEpic$: Epic = action$ =>
  action$.ofType(AuthActionType.Login).pipe(
    exhaustMap(({ payload }: authActions.Login) =>
      from(authApi.login(payload.values)).pipe(
        map(profile => new authActions.AuthenticateSuccess({ pathname: payload.pathname, profile })),
        catchError(error => of(new authActions.AuthenticateError({ error }))),
      ),
    ),
  );

const logoutEpic$: Epic = action$ =>
  action$.ofType(AuthActionType.Logout).pipe(
    exhaustMap(() =>
      from(authApi.logout()).pipe(
        map(() => new authActions.LogoutSuccess()),
        catchError(error => of(new authActions.LogoutError({ error }))),
      ),
    ),
  );

const logoutSuccessEpic$: Epic = action$ =>
  action$.ofType(AuthActionType.LogoutSuccess).pipe(switchMap(() => of(push('/auth/login'))));

const requestPasswordResetEpic$: Epic = action$ =>
  action$.ofType(AuthActionType.RequestPasswordReset).pipe(
    exhaustMap(({ payload }: authActions.RequestPasswordReset) =>
      from(authApi.requestPasswordReset(payload.values)).pipe(
        map(() => new authActions.RequestPasswordResetSuccess()),
        catchError(error => of(new authActions.RequestPasswordResetError({ error }))),
      ),
    ),
  );

const requestPasswordResetSuccessEpic$: Epic = action$ =>
  action$.ofType(AuthActionType.RequestPasswordResetSuccess).pipe(switchMap(() => of(push('/auth/login'))));

export default [
  unauthorizedEpic$,
  authenticateEpic$,
  authenticateSuccessEpic$,
  choosePasswordEpic$,
  choosePasswordSuccessEpic$,
  loginEpic$,
  logoutEpic$,
  logoutSuccessEpic$,
  requestPasswordResetEpic$,
  requestPasswordResetSuccessEpic$,
];
