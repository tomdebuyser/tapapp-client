import { Epic } from 'redux-observable';
import { from, of } from 'rxjs';
import { map, catchError, exhaustMap, switchMap } from 'rxjs/operators';
import { push } from 'connected-react-router';
import { rolesActions } from '../../_store/actions';
import { RolesActionType } from './actions';
import * as rolesApi from './api';

export const GetRolesEpic$: Epic = action$ =>
  action$.ofType(RolesActionType.GetRoles).pipe(
    exhaustMap(({ query }: rolesActions.GetRoles) =>
      from(rolesApi.getRoles(query)).pipe(
        map(({ data, meta }) => new rolesActions.GetRolesSuccess({ data, meta })),
        catchError(error => of(new rolesActions.GetRolesError({ error }))),
      ),
    ),
  );

export const CreateRoleEpic$: Epic = action$ =>
  action$.ofType(RolesActionType.CreateRole).pipe(
    switchMap(({ payload }: rolesActions.CreateRole) =>
      from(rolesApi.createRole(payload)).pipe(
        map(() => new rolesActions.CreateRoleSuccess()),
        catchError(error => of(new rolesActions.CreateRoleError({ error }))),
      ),
    ),
  );

export const CreateRoleSuccessEpic$: Epic = action$ =>
  action$.ofType(rolesActions.RolesActionType.CreateRoleSuccess).pipe(switchMap(() => of(push('/roles'))));

const RolesEpics = [GetRolesEpic$, CreateRoleEpic$, CreateRoleSuccessEpic$];

export default RolesEpics;
