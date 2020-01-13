import { Epic } from 'redux-observable';
import { from, of } from 'rxjs';
import { map, catchError, exhaustMap, switchMap } from 'rxjs/operators';
import { push } from 'connected-react-router';
import { rolesActions } from '../../_store/actions';
import { rolesSelectors } from '../../_store/selectors';
import { RolesActionType } from './actions';
import * as rolesApi from './api';

export const getRolesEpic$: Epic = (action$, state$) =>
  action$.ofType(RolesActionType.GetRoles).pipe(
    exhaustMap(() => {
      const query = rolesSelectors.query(state$.value);
      return from(rolesApi.getRoles(query)).pipe(
        map(({ data, meta }) => new rolesActions.GetRolesSuccess({ data, meta })),
        catchError(error => of(new rolesActions.GetRolesError({ error }))),
      );
    }),
  );

export const setRolesQueryEpic$: Epic = action$ =>
  action$.ofType(RolesActionType.SetRolesQuery).pipe(map(() => new rolesActions.GetRoles()));

export const createRoleEpic$: Epic = action$ =>
  action$.ofType(RolesActionType.CreateRole).pipe(
    switchMap(({ payload }: rolesActions.CreateRole) =>
      from(rolesApi.createRole(payload)).pipe(
        map(() => new rolesActions.CreateRoleSuccess()),
        catchError(error => of(new rolesActions.CreateRoleError({ error }))),
      ),
    ),
  );

export const createRoleSuccessEpic$: Epic = action$ =>
  action$.ofType(rolesActions.RolesActionType.CreateRoleSuccess).pipe(switchMap(() => of(push('/roles'))));

const RolesEpics = [getRolesEpic$, setRolesQueryEpic$, createRoleEpic$, createRoleSuccessEpic$];

export default RolesEpics;
