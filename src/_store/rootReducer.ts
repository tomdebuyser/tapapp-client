import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import { combineReducers, Reducer, Action } from 'redux';
import authReducer, { AuthState } from '../auth/_store/reducer';
import categoriesReducer, { CategoriesState } from '../categories/_store/reducer';
import modalReducer, { ModalState } from '../modal/_store/reducer';
import orderReducer, { OrderState } from '../order/_store/reducer';
import profileReducer, { ProfileState } from '../profile/_store/reducer';
import { AuthActionType } from '../auth/_store/actions';

export type AppState = {
  auth: AuthState;
  categories: CategoriesState;
  modal: ModalState;
  order: OrderState;
  profile: ProfileState;
  router: RouterState;
};

function appReducer(history: History): Reducer {
  return combineReducers<AppState>({
    auth: authReducer,
    categories: categoriesReducer,
    modal: modalReducer,
    order: orderReducer,
    profile: profileReducer,
    router: connectRouter(history),
  });
}

export default (history: History) => (state: AppState, action: Action) => {
  if (action.type === AuthActionType.LogoutSuccess) {
    return appReducer(history)(undefined, action);
  }
  return appReducer(history)(state, action);
};
