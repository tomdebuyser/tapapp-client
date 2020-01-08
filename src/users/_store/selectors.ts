import { createSelector } from 'reselect';
import { AppState } from '../../_store/rootReducer';
import { UsersState } from './reducer';

const selectNode = (state: AppState) => state.users;

export const users = createSelector(selectNode, (state: UsersState) => state.users);
export const metadata = createSelector(selectNode, (state: UsersState) => state.metadata);
export const isLoading = createSelector(selectNode, (state: UsersState) => state.isLoading);
export const error = createSelector(selectNode, (state: UsersState) => state.error);
export const isCreateUserLoading = createSelector(selectNode, (state: UsersState) => state.isCreateUserLoading);
export const errorCreateUser = createSelector(selectNode, (state: UsersState) => state.errorCreateUser);
