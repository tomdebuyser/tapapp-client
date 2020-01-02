import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import { combineReducers, Reducer } from 'redux';

export interface AppState {
  router: RouterState;
}

export default (history: History): Reducer =>
  combineReducers<AppState>({
    router: connectRouter(history),
  });
