import { IUser } from '../_models/User';
import { ApiError } from '../../_http';
import { Actions, ActionType } from './actions';

export interface UsersState {
  users?: IUser[];
  isLoading: boolean;
  error?: ApiError;
}

const initialState: UsersState = {
  isLoading: false,
};

export default function reducer(state = initialState, action: Actions): UsersState {
  switch (action.type) {
    case ActionType.GetUsers:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case ActionType.GetUsersSuccess:
      return {
        ...state,
        isLoading: false,
        users: action.payload.data,
      };
    case ActionType.GetUsersError:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
}
