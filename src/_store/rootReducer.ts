import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import { combineReducers, Reducer, Action } from 'redux';
import rolesReducer, { RolesState, initialState as rolesInitialState } from '../roles/_store/reducer';
import usersReducer, { UsersState, initialState as usersInitialState } from '../users/_store/reducer';
import authReducer, { AuthState, initialState as authInitialState } from '../auth/_store/reducer';
import modalReducer, { ModalState, initialState as modalInitialState } from '../modal/_store/reducer';
import profileReducer, { ProfileState, initialState as profileInitialState } from '../profile/_store/reducer';
import { AuthActionType } from '../auth/_store/actions';

export interface AppState {
  auth: AuthState;
  modal: ModalState;
  profile: ProfileState;
  roles: RolesState;
  router: RouterState;
  users: UsersState;
}

function initialState(state: AppState): AppState {
  return {
    auth: authInitialState,
    modal: modalInitialState,
    profile: profileInitialState,
    roles: rolesInitialState,
    router: state.router,
    users: usersInitialState,
  };
}

function appReducer(history: History): Reducer {
  return combineReducers<AppState>({
    auth: authReducer,
    modal: modalReducer,
    profile: profileReducer,
    roles: rolesReducer,
    router: connectRouter(history),
    users: usersReducer,
  });
}

export default (history: History) => (state: AppState, action: Action) => {
  if (action.type === AuthActionType.LogoutSuccess) {
    return appReducer(history)(initialState(state), action);
  }
  return appReducer(history)(state, action);
};
