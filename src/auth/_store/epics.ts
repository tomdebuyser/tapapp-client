import { Epic } from 'redux-observable';
import { from, of } from 'rxjs';
import { map, catchError, switchMap, exhaustMap, filter, tap } from 'rxjs/operators';
import { push } from 'connected-react-router';
import { Action } from 'redux';
import { authActions } from '../../_store/actions';
import { HttpStatus, ApiError } from '../../_http';
import { UNAUTHORIZES_ROUTES } from '../../_routing/layouts/unauthorized/UnauthorizedLayout';
import { routerSelectors } from '../../_store/selectors';
import { I18n } from '../../_translations';
import * as authApi from './api';
import { AuthActionType } from './actions';

type GenericErrorAction = Action & {
  payload?: {
    error?: ApiError;
  };
};

const unauthorizedEpic$: Epic = (action$, state$) =>
  action$.pipe(
    filter(() => !UNAUTHORIZES_ROUTES.some(route => routerSelectors.pathname(state$.value).startsWith(route))),
    filter((action: GenericErrorAction) => action.type !== AuthActionType.LoginError),
    filter((action: GenericErrorAction) => action.payload?.error?.statusCode === HttpStatus.Unauthorized),
    map(() => new authActions.LogoutSuccess()),
  );

const authenticateEpic$: Epic = action$ =>
  action$.ofType(AuthActionType.Authenticate).pipe(
    exhaustMap(() =>
      from(authApi.authenticate()).pipe(
        map(profile => new authActions.AuthenticateSuccess({ profile })),
        catchError(error => of(new authActions.AuthenticateError({ error }))),
      ),
    ),
  );

const authenticateSuccessEpic$: Epic = action$ =>
  action$.ofType(AuthActionType.AuthenticateSuccess).pipe(
    filter(({ payload }: authActions.AuthenticateSuccess) => !!payload.pathname),
    switchMap(({ payload }: authActions.AuthenticateSuccess) => of(push(payload.pathname))),
  );

const loginEpic$: Epic = action$ =>
  action$.ofType(AuthActionType.Login).pipe(
    exhaustMap(({ payload }: authActions.Login) =>
      from(authApi.login(payload.values)).pipe(
        map(profile => new authActions.AuthenticateSuccess({ pathname: payload.pathname, profile })),
        catchError(error => of(new authActions.LoginError({ error }))),
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

const setLocaleEpic$: Epic = action$ =>
  action$.ofType(AuthActionType.SetLocale).pipe(
    tap(({ payload }: authActions.SetLocale) => I18n.setLocale(payload.locale)),
    switchMap(() => of()),
  );

const setDevModeEpic$: Epic = action$ =>
  action$.ofType(AuthActionType.SetDevMode).pipe(
    tap(({ payload }: authActions.SetDevMode) => I18n.setDevMode(payload.isDevMode)),
    switchMap(() => of()),
  );

export default [
  authenticateEpic$,
  authenticateSuccessEpic$,
  loginEpic$,
  logoutEpic$,
  logoutSuccessEpic$,
  unauthorizedEpic$,
  setLocaleEpic$,
  setDevModeEpic$,
];
