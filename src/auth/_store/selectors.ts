import { createSelector } from 'reselect';
import { AppState } from '../../_store/rootReducer';
import { AuthState } from './reducer';

const selectNode = (state: AppState) => state.auth;

export const isResetPasswordLoading = createSelector(selectNode, (state: AuthState) => state.isResetPasswordLoading);
export const errorResetPassword = createSelector(selectNode, (state: AuthState) => state.errorResetPassword);
