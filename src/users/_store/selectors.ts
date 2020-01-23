import { createSelector } from 'reselect';
import { AppState } from '../../_store/rootReducer';
import { UsersState } from './reducer';

const selectNode = (state: AppState) => state.users;

export const errorCreateUser = createSelector(selectNode, (state: UsersState) => state.errorCreateUser);
export const errorGetUsers = createSelector(selectNode, (state: UsersState) => state.errorGetUsers);
export const errorInactivateUser = createSelector(selectNode, (state: UsersState) => state.errorInactivateUser);
export const errorResendRegisterEmail = createSelector(selectNode, (state: UsersState) => state.errorResendRegisterEmail);
export const errorUpdateUser = createSelector(selectNode, (state: UsersState) => state.errorUpdateUser);
export const isCreateUserLoading = createSelector(selectNode, (state: UsersState) => state.isCreateUserLoading);
export const isGetUsersLoading = createSelector(selectNode, (state: UsersState) => state.isGetUsersLoading);
export const isInactivateUserLoading = createSelector(selectNode, (state: UsersState) => state.isInactivateUserLoading);
export const isResendRegisterEmailLoading = createSelector(selectNode, (state: UsersState) => state.isResendRegisterEmailLoading);
export const isUpdateUserLoading = createSelector(selectNode, (state: UsersState) => state.isUpdateUserLoading);
export const metadata = createSelector(selectNode, (state: UsersState) => state.metadata);
export const query = createSelector(selectNode, (state: UsersState) => state.query);
export const users = createSelector(selectNode, (state: UsersState) => state.users);
export const user = (userId: string) =>
  createSelector(selectNode, (state: UsersState) => state.users?.find(user => user.id === userId));
