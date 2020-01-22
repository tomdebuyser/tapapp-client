import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import { combineReducers, Reducer } from 'redux';
import rolesReducer, { RolesState } from '../roles/_store/reducer';
import usersReducer, { UsersState } from '../users/_store/reducer';
import authReducer, { AuthState } from '../auth/_store/reducer';
import modalReducer, { ModalState } from '../modal/_store/reducer';

export interface AppState {
  auth: AuthState;
  modal: ModalState;
  roles: RolesState;
  router: RouterState;
  users: UsersState;
}

export default (history: History): Reducer =>
  combineReducers<AppState>({
    auth: authReducer,
    roles: rolesReducer,
    router: connectRouter(history),
    users: usersReducer,
    modal: modalReducer,
  });
