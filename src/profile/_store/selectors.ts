import { createSelector } from 'reselect';
import { AppState } from '../../_store/rootReducer';
import { ProfileState } from './reducer';

const selectNode = (state: AppState) => state.profile;

export const profile = createSelector(selectNode, (state: ProfileState) => state.profile);
export const isLoggedIn = createSelector(selectNode, (state: ProfileState) => !!state.profile);
