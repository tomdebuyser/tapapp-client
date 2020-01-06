import { IUser } from '../_models/User';
import { ApiError } from '../../_http';
import { UsersAction, UsersActionType } from '../_store/actions';

export interface UsersState {
  users?: IUser[];
  isLoading: boolean;
  error?: ApiError;
}

const initialState: UsersState = {
  isLoading: false,
};

export default function reducer(state = initialState, action: UsersAction): UsersState {
  switch (action.type) {
    case UsersActionType.GetUsers:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case UsersActionType.GetUsersSuccess:
      return {
        ...state,
        isLoading: false,
        users: action.payload.data,
      };
    case UsersActionType.GetUsersError:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
}
