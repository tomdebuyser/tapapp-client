import { createSelector } from 'reselect';
import { AppState } from '../../_store/rootReducer';
import { OrdersState } from './reducer';

const selectNode = (state: AppState) => state.orders;

export const unfinishedOrders = createSelector(selectNode, (state: OrdersState) => state.unfinishedOrders);
export const isGetUnfinishedOrdersLoading = createSelector(
  selectNode,
  (state: OrdersState) => state.isGetUnfinishedOrdersLoading,
);
export const errorGetUnfinishedOrders = createSelector(selectNode, (state: OrdersState) => state.errorGetUnfinishedOrders);
