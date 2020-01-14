import { Epic } from 'redux-observable';
import { from, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
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
  action$.ofType(authActions.AuthActionType.ResetPasswordSuccess).pipe(switchMap(() => of(push('/auth/login'))));

const AuthEpics = [resetPasswordEpic$, resetPasswordSuccessEpic$];

export default AuthEpics;
