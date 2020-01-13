import { createSelector } from 'reselect';
import { AppState } from '../../_store/rootReducer';
import { RolesState } from './reducer';

const selectNode = (state: AppState) => state.roles;

export const roles = createSelector(selectNode, (state: RolesState) => state.roles);
export const metadata = createSelector(selectNode, (state: RolesState) => state.metadata);
export const query = createSelector(selectNode, (state: RolesState) => state.query);
export const isGetRolesLoading = createSelector(selectNode, (state: RolesState) => state.isGetRolesLoading);
export const errorGetRoles = createSelector(selectNode, (state: RolesState) => state.errorGetRoles);
export const isCreateRoleLoading = createSelector(selectNode, (state: RolesState) => state.isCreateRoleLoading);
export const errorCreateRole = createSelector(selectNode, (state: RolesState) => state.errorCreateRole);
