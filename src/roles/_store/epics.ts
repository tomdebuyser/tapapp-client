import { Epic } from 'redux-observable';
import { from, of } from 'rxjs';
import { map, catchError, exhaustMap, switchMap, filter } from 'rxjs/operators';
import { push } from 'connected-react-router';
import { rolesActions, modalActions } from '../../_store/actions';
import { rolesSelectors } from '../../_store/selectors';
import { translations } from '../../_translations';
import { RolesActionType } from './actions';
import * as rolesApi from './api';

const getRolesEpic$: Epic = (action$, state$) =>
  action$.ofType(RolesActionType.GetRoles).pipe(
    exhaustMap(() => {
      const query = rolesSelectors.query(state$.value);
      return from(rolesApi.getRoles(query)).pipe(
        map(({ data, meta }) => new rolesActions.GetRolesSuccess({ data, meta })),
        catchError(error => of(new rolesActions.GetRolesError({ error }))),
      );
    }),
  );

const setRolesQueryEpic$: Epic = action$ =>
  action$.ofType(RolesActionType.SetRolesQuery).pipe(map(() => new rolesActions.GetRoles()));

const createRoleEpic$: Epic = action$ =>
  action$.ofType(RolesActionType.CreateRole).pipe(
    switchMap(({ payload }: rolesActions.CreateRole) =>
      from(rolesApi.createRole(payload)).pipe(
        map(() => new rolesActions.CreateRoleSuccess()),
        catchError(error => of(new rolesActions.CreateRoleError({ error }))),
      ),
    ),
  );

const createDeleteRoleSuccessEpic$: Epic = action$ =>
  action$.ofType(RolesActionType.CreateRoleSuccess, RolesActionType.DeleteRoleSuccess).pipe(switchMap(() => of(push('/roles'))));

const updateRoleEpic$: Epic = action$ =>
  action$.ofType(RolesActionType.UpdateRole).pipe(
    exhaustMap(({ payload }: rolesActions.UpdateRole) =>
      from(rolesApi.updateRole(payload.roleId, payload.form)).pipe(
        map(updatedRole => new rolesActions.UpdateRoleSuccess({ updatedRole })),
        catchError(error => of(new rolesActions.UpdateRoleError({ error }))),
      ),
    ),
  );

const deleteRoleWithConfirmationEpic$: Epic = action$ =>
  action$.ofType(RolesActionType.DeleteRole).pipe(
    filter(({ payload }: rolesActions.DeleteRole) => !payload.confirmed),
    map(({ payload }: rolesActions.DeleteRole) => {
      return new modalActions.ShowConfirmationModal({
        title: payload.role.name,
        content: translations.getLabel('ROLES.DELETE.CONTENT'),
        confirmText: translations.getLabel('ROLES.DELETE.CONFIRM'),
        confirmAction: () => new rolesActions.DeleteRole({ role: payload.role, confirmed: true }),
      });
    }),
  );

const deleteRoleEpic$: Epic = action$ =>
  action$.ofType(RolesActionType.DeleteRole).pipe(
    filter(({ payload }: rolesActions.DeleteRole) => payload.confirmed),
    exhaustMap(({ payload }: rolesActions.DeleteRole) =>
      from(rolesApi.deleteRole(payload.role.id)).pipe(
        map(() => new rolesActions.DeleteRoleSuccess({ roleId: payload.role.id })),
        catchError(error => of(new rolesActions.DeleteRoleError({ error }))),
      ),
    ),
  );

export default [
  getRolesEpic$,
  setRolesQueryEpic$,
  createRoleEpic$,
  createDeleteRoleSuccessEpic$,
  updateRoleEpic$,
  deleteRoleEpic$,
  deleteRoleWithConfirmationEpic$,
];
