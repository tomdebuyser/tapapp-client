import { ApiError } from '../../_http';
import { IOrderItem, IOrder } from '../_models';
import { ICategory } from '../../categories/_models';
import { OrderAction, OrderActionType } from './actions';

export type OrderState = {
  activeCategory?: ICategory;
  errorCrudOrder?: ApiError;
  errorPayOrder?: ApiError;
  isCreateOrderLoading: boolean;
  isDeleteOrderLoading: boolean;
  isGetOrderLoading: boolean;
  isPayOrderLoading: boolean;
  isUpdateOrderLoading: boolean;
  items: IOrderItem[];
  orderId?: string;
};

const initialState: OrderState = {
  isCreateOrderLoading: false,
  isDeleteOrderLoading: false,
  isGetOrderLoading: false,
  isPayOrderLoading: false,
  isUpdateOrderLoading: false,
  items: [],
};

export default function reducer(state = initialState, action: OrderAction): OrderState {
  function keepOrderDetails(order: IOrder): Partial<OrderState> {
    return { items: order.items, orderId: order.id };
  }

  switch (action.type) {
    case OrderActionType.ClearState:
      return initialState;
    case OrderActionType.AddRemoveProduct: {
      const { product } = action.payload;
      const item: IOrderItem = state.items.find(it => it.product.id === product.id);
      return {
        ...state,
        items: state.items
          .filter(it => it !== item)
          .concat({
            ...item,
            amount: (item?.amount || 0) + action.payload.amountToAdd,
            product,
          })
          .filter(p => p.amount > 0),
      };
    }
    case OrderActionType.SetActiveCategory:
      return {
        ...state,
        activeCategory: action.payload.category,
      };
    case OrderActionType.GetOrder:
      return {
        ...state,
        errorCrudOrder: null,
        isGetOrderLoading: true,
      };
    case OrderActionType.GetOrderSuccess:
      return {
        ...state,
        isGetOrderLoading: false,
        ...keepOrderDetails(action.payload.order),
      };
    case OrderActionType.GetOrderError:
      return {
        ...state,
        errorCrudOrder: action.payload.error,
        isGetOrderLoading: false,
      };
    case OrderActionType.CreateOrder:
      return {
        ...state,
        errorCrudOrder: null,
        isCreateOrderLoading: true,
      };
    case OrderActionType.CreateOrderSuccess:
      return {
        ...state,
        isCreateOrderLoading: false,
        ...keepOrderDetails(action.payload.createdOrder),
      };
    case OrderActionType.CreateOrderError:
      return {
        ...state,
        errorCrudOrder: action.payload.error,
        isCreateOrderLoading: false,
      };
    case OrderActionType.UpdateOrder:
    case OrderActionType.AddClientName:
      return {
        ...state,
        errorCrudOrder: null,
        isUpdateOrderLoading: true,
      };
    case OrderActionType.UpdateOrderSuccess:
    case OrderActionType.AddClientNameSuccess:
      return {
        ...state,
        isUpdateOrderLoading: false,
        ...keepOrderDetails(action.payload.updatedOrder),
      };
    case OrderActionType.UpdateOrderError:
    case OrderActionType.AddClientNameError:
      return {
        ...state,
        errorCrudOrder: action.payload.error,
        isUpdateOrderLoading: false,
      };
    case OrderActionType.DeleteOrder:
      return {
        ...state,
        errorCrudOrder: null,
        isDeleteOrderLoading: true,
      };
    case OrderActionType.DeleteOrderSuccess:
      return {
        ...state,
        isDeleteOrderLoading: false,
      };
    case OrderActionType.DeleteOrderError:
      return {
        ...state,
        errorCrudOrder: action.payload.error,
        isDeleteOrderLoading: false,
      };
    case OrderActionType.PayOrder:
      return {
        ...state,
        errorPayOrder: null,
        isPayOrderLoading: true,
      };
    case OrderActionType.PayOrderSuccess:
      return {
        ...state,
        isPayOrderLoading: false,
      };
    case OrderActionType.PayOrderError:
      return {
        ...state,
        errorPayOrder: action.payload.error,
        isPayOrderLoading: false,
      };
    default:
      return state;
  }
}
