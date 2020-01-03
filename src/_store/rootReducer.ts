import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import { combineReducers, Reducer } from 'redux';
import usersReducer, { UsersState } from '../users/_store/reducers';

export interface AppState {
  router: RouterState;
  users: UsersState;
}

export default (history: History): Reducer =>
  combineReducers<AppState>({
    router: connectRouter(history),
    users: usersReducer,
  });
