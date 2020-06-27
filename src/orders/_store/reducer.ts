import { ApiError } from '../../_http';
import { IOrder } from '../../order/_models';
import { OrdersAction, OrdersActionType } from './actions';

export type OrdersState = {
  errorGetUnfinishedOrders?: ApiError;
  isGetUnfinishedOrdersLoading: boolean;
  unfinishedOrders?: IOrder[];
};

const initialState: OrdersState = {
  isGetUnfinishedOrdersLoading: false,
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
    default:
      return state;
  }
}
