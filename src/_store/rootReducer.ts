import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import { combineReducers, Reducer } from 'redux';
import rolesReducer, { RolesState } from '../roles/_store/reducer';
import usersReducer, { UsersState } from '../users/_store/reducer';

export interface AppState {
  roles: RolesState;
  router: RouterState;
  users: UsersState;
}

export default (history: History): Reducer =>
  combineReducers<AppState>({
    roles: rolesReducer,
    router: connectRouter(history),
    users: usersReducer,
  });
