import { createSelector } from 'reselect';
import { AppState } from '../../_store/rootReducer';
import { CategoriesState } from './reducer';

const selectNode = (state: AppState) => state.categories;

export const categories = createSelector(selectNode, (state: CategoriesState) => state.categories);
export const isGetCategoriesLoading = createSelector(selectNode, (state: CategoriesState) => state.isGetCategoriesLoading);
export const errorGetCategories = createSelector(selectNode, (state: CategoriesState) => state.errorGetCategories);
export const orderedProducts = createSelector(selectNode, (state: CategoriesState) =>
  (state.categories || []).map(category => category.products.map(product => product.id)).reduce((a1, a2) => a1.concat(a2), []),
);
