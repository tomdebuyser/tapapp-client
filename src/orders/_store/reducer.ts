import { ApiError } from '../../_http';
import { IOrder } from '../../order/_models';
import { OrdersAction, OrdersActionType } from './actions';

export type OrdersState = {
  errorGetUnfinishedOrders?: ApiError;
  errorMergeOrders?: ApiError;
  isGetUnfinishedOrdersLoading: boolean;
  isMergeOrdersLoading: boolean;
  unfinishedOrders?: IOrder[];
};

const initialState: OrdersState = {
  isGetUnfinishedOrdersLoading: false,
  isMergeOrdersLoading: false,
};

export default function reducer(state = initialState, action: OrdersAction): OrdersState {
  switch (action.type) {
    case OrdersActionType.GetUnfinishedOrders:
      return {
        ...state,
        errorGetUnfinishedOrders: null,
        isGetUnfinishedOrdersLoading: true,
      };
    case OrdersActionType.GetUnfinishedOrdersSuccess:
      return {
        ...state,
        isGetUnfinishedOrdersLoading: false,
        unfinishedOrders: action.payload.orders,
      };
    case OrdersActionType.GetUnfinishedOrdersError:
      return {
        ...state,
        errorGetUnfinishedOrders: action.payload.error,
        isGetUnfinishedOrdersLoading: false,
      };
    case OrdersActionType.MergeOrders:
      return {
        ...state,
        errorMergeOrders: null,
        isMergeOrdersLoading: true,
      };
    case OrdersActionType.MergeOrdersSuccess:
      return {
        ...state,
        isMergeOrdersLoading: false,
      };
    case OrdersActionType.MergeOrdersError:
      return {
        ...state,
        errorMergeOrders: action.payload.error,
        isMergeOrdersLoading: false,
      };
    default:
      return state;
  }
}
