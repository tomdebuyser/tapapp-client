import { createSelector } from 'reselect';
import { AppState } from '../../_store/rootReducer';
import { RolesState } from './reducer';

const selectNode = (state: AppState) => state.roles;

export const roles = createSelector(selectNode, (state: RolesState) => state.roles);
export const role = (roleId: string) =>
  createSelector(selectNode, (state: RolesState) => state.roles?.find(role => role.id === roleId));
export const metadata = createSelector(selectNode, (state: RolesState) => state.metadata);
export const query = createSelector(selectNode, (state: RolesState) => state.query);
export const errorGetRoles = createSelector(selectNode, (state: RolesState) => state.errorGetRoles);
export const errorCreateRole = createSelector(selectNode, (state: RolesState) => state.errorCreateRole);
export const errorUpdateRole = createSelector(selectNode, (state: RolesState) => state.errorUpdateRole);
export const isGetRolesLoading = createSelector(selectNode, (state: RolesState) => state.isGetRolesLoading);
export const isCreateRoleLoading = createSelector(selectNode, (state: RolesState) => state.isCreateRoleLoading);
export const isUpdateRoleLoading = createSelector(selectNode, (state: RolesState) => state.isUpdateRoleLoading);
