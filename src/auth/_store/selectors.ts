import { createSelector } from 'reselect';
import { AppState } from '../../_store/rootReducer';
import { AuthState } from './reducer';

const selectNode = (state: AppState) => state.auth;

export const isAuthenticateLoading = createSelector(selectNode, (state: AuthState) => state.isAuthenticateLoading);
export const errorLogin = createSelector(selectNode, (state: AuthState) => state.errorLogin);
export const errorLogout = createSelector(selectNode, (state: AuthState) => state.errorLogout);
export const isLoginLoading = createSelector(selectNode, (state: AuthState) => state.isLoginLoading);
export const isLogoutLoading = createSelector(selectNode, (state: AuthState) => state.isLogoutLoading);
