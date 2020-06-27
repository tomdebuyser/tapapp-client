import { createSelector } from 'reselect';
import { AppState } from '../../_store/rootReducer';
import { PayconiqState } from './reducer';

const selectNode = (state: AppState) => state.payconiq;

export const payment = createSelector(selectNode, (state: PayconiqState) => state.payment);
export const isCrudPaymentLoading = createSelector(selectNode, (state: PayconiqState) => state.isCrudPaymentLoading);
export const errorCrudPayment = createSelector(selectNode, (state: PayconiqState) => state.errorCrudPayment);
