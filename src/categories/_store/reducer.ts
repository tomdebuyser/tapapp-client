import { ApiError } from '../../_http';
import { ICategory } from '../_models';
import { CategoriesAction, CategoriesActionType } from './actions';

export type CategoriesState = {
  categories?: ICategory[];
  errorGetCategories?: ApiError;
  isGetCategoriesLoading: boolean;
};

const initialState: CategoriesState = {
  isGetCategoriesLoading: false,
};

export default function reducer(state = initialState, action: CategoriesAction): CategoriesState {
  switch (action.type) {
    case CategoriesActionType.GetCategories:
      return {
        ...state,
        errorGetCategories: null,
        isGetCategoriesLoading: true,
      };
    case CategoriesActionType.GetCategoriesSuccess:
      return {
        ...state,
        categories: action.payload.categories,
        isGetCategoriesLoading: false,
      };
    case CategoriesActionType.GetCategoriesError:
      return {
        ...state,
        errorGetCategories: action.payload.error,
        isGetCategoriesLoading: false,
      };
    default:
      return state;
  }
}
