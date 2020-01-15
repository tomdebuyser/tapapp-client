import { createSelector } from 'reselect';
import { AppState } from '../../_store/rootReducer';
import { UsersState } from './reducer';

const selectNode = (state: AppState) => state.users;

export const errorCreateUser = createSelector(selectNode, (state: UsersState) => state.errorCreateUser);
export const errorGetUsers = createSelector(selectNode, (state: UsersState) => state.errorGetUsers);
export const errorRemoveUser = createSelector(selectNode, (state: UsersState) => state.errorRemoveUser);
export const isCreateUserLoading = createSelector(selectNode, (state: UsersState) => state.isCreateUserLoading);
export const isGetUsersLoading = createSelector(selectNode, (state: UsersState) => state.isGetUsersLoading);
export const isRemoveUserLoading = createSelector(selectNode, (state: UsersState) => state.isRemoveUserLoading);
export const metadata = createSelector(selectNode, (state: UsersState) => state.metadata);
export const query = createSelector(selectNode, (state: UsersState) => state.query);
export const users = createSelector(selectNode, (state: UsersState) => state.users);
