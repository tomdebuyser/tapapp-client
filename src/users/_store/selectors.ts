import { createSelector } from 'reselect';
import { AppState } from '../../_store/rootReducer';
import { UsersState } from './reducers';

const selectNode = (state: AppState) => state.users;

export const users = createSelector(selectNode, (state: UsersState) => state.users);
export const isLoading = createSelector(selectNode, (state: UsersState) => state.isLoading);
export const error = createSelector(selectNode, (state: UsersState) => state.error);
