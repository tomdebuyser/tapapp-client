import { createSelector } from 'reselect';
import { AppState } from '../../_store/rootReducer';
import { AuthState } from './reducer';

const selectNode = (state: AppState) => state.auth;

export const isChoosePasswordLoading = createSelector(selectNode, (state: AuthState) => state.isChoosePasswordLoading);
export const errorChoosePassword = createSelector(selectNode, (state: AuthState) => state.errorChoosePassword);

export const isLoginLoading = createSelector(selectNode, (state: AuthState) => state.isLoginLoading);
export const errorLogin = createSelector(selectNode, (state: AuthState) => state.errorLogin);
export const user = createSelector(selectNode, (state: AuthState) => state.user);

export const isLogoutLoading = createSelector(selectNode, (state: AuthState) => state.isLogoutLoading);
export const errorLogout = createSelector(selectNode, (state: AuthState) => state.errorLogout);

export const isRequestPasswordResetLoading = createSelector(
  selectNode,
  (state: AuthState) => state.isRequestPasswordResetLoading,
);
export const errorRequestPasswordReset = createSelector(selectNode, (state: AuthState) => state.errorRequestPasswordReset);
