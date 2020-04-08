import { createSelector } from 'reselect';
import { AppState } from '../../_store/rootReducer';
import { RolesState } from './reducer';

const selectNode = (state: AppState) => state.roles;

export const roles = createSelector(selectNode, (state: RolesState) => state.roles);
export const role = createSelector(selectNode, (state: RolesState) => state.detail);
export const metadata = createSelector(selectNode, (state: RolesState) => state.metadata);
export const query = createSelector(selectNode, (state: RolesState) => state.query);
export const errorCrudRole = createSelector(selectNode, (state: RolesState) => state.errorCrudRole);
export const errorCrudRoles = createSelector(selectNode, (state: RolesState) => state.errorCrudRoles);
export const isCreateRoleLoading = createSelector(selectNode, (state: RolesState) => state.isCreateRoleLoading);
export const isDeleteRoleLoading = createSelector(selectNode, (state: RolesState) => state.isDeleteRoleLoading);
export const isGetRoleLoading = createSelector(selectNode, (state: RolesState) => state.isGetRoleLoading);
export const isGetRolesLoading = createSelector(selectNode, (state: RolesState) => state.isGetRolesLoading);
export const isUpdateRoleLoading = createSelector(selectNode, (state: RolesState) => state.isUpdateRoleLoading);
