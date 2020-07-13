import { createSelector } from 'reselect';
import { AppState } from '../../_store/rootReducer';
import { categoriesSelectors } from '../../_store/selectors';
import { ICategory } from '../../categories/_models';
import { OrderState } from './reducer';

const selectNode = (state: AppState) => state.order;

export const orderId = createSelector(selectNode, (state: OrderState) => state.orderId);
export const items = createSelector(selectNode, (state: OrderState) => state.items);
export const itemsSorted = createSelector(
  selectNode,
  categoriesSelectors.orderedProducts,
  (state: OrderState, productIds: string[]) => {
    return state.items.sort((i1, i2) => productIds.indexOf(i1.product.id) - productIds.indexOf(i2.product.id));
  },
);
export const activeCategory = createSelector(
  selectNode,
  categoriesSelectors.categories,
  (state: OrderState, categories: ICategory[]) => state.activeCategory || (categories || [])[0],
);
export const productCount = (productId: string) =>
  createSelector(selectNode, (state: OrderState) => state.items.find(it => it.product.id === productId)?.amount || 0);

export const totalProductsCount = createSelector(selectNode, (state: OrderState) =>
  state.items.map(item => item.amount).reduce((a, b) => a + b, 0),
);

export const totalPrice = createSelector(selectNode, (state: OrderState) =>
  state.items.map(item => item.amount * item.product.price).reduce((a, b) => a + b, 0),
);
export const isUnfinishedOrder = createSelector(selectNode, (state: OrderState) => state.isUnfinishedOrder);
export const isCreateOrderLoading = createSelector(selectNode, (state: OrderState) => state.isCreateOrderLoading);
export const isDeleteOrderLoading = createSelector(selectNode, (state: OrderState) => state.isDeleteOrderLoading);
export const isGetOrderLoading = createSelector(selectNode, (state: OrderState) => state.isGetOrderLoading);
export const isPayOrderLoading = createSelector(selectNode, (state: OrderState) => state.isPayOrderLoading);
export const isUpdateOrderLoading = createSelector(selectNode, (state: OrderState) => state.isUpdateOrderLoading);
export const errorCrudOrder = createSelector(selectNode, (state: OrderState) => state.errorCrudOrder);
