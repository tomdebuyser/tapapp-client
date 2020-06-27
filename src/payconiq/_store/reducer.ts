import { ApiError } from '../../_http';
import { IPayconiqPayment } from '../_models';
import { PayconiqPaymentAction, PayconiqPaymentActionType } from './actions';

export type PayconiqState = {
  errorCrudPayment?: ApiError;
  isCrudPaymentLoading: boolean;
  payment?: IPayconiqPayment;
};

const initialState: PayconiqState = {
  isCrudPaymentLoading: false,
};

export default function reducer(state = initialState, action: PayconiqPaymentAction): PayconiqState {
  switch (action.type) {
    case PayconiqPaymentActionType.ClearState:
      return initialState;
    case PayconiqPaymentActionType.GetPayconiqPayment:
    case PayconiqPaymentActionType.CancelPayconiqPayment:
      return {
        ...state,
        errorCrudPayment: null,
        isCrudPaymentLoading: true,
      };
    case PayconiqPaymentActionType.CreatePayconiqPayment:
      return {
        ...initialState,
        isCrudPaymentLoading: true,
      };
    case PayconiqPaymentActionType.GetPayconiqPaymentSuccess:
    case PayconiqPaymentActionType.CreatePayconiqPaymentSuccess:
      return {
        ...state,
        isCrudPaymentLoading: false,
        payment: action.payload.payment,
      };
    case PayconiqPaymentActionType.CancelPayconiqPaymentSuccess:
      return {
        ...state,
        isCrudPaymentLoading: false,
      };
    case PayconiqPaymentActionType.GetPayconiqPaymentError:
    case PayconiqPaymentActionType.CreatePayconiqPaymentError:
    case PayconiqPaymentActionType.CancelPayconiqPaymentError:
      return {
        ...state,
        errorCrudPayment: action.payload.error,
        isCrudPaymentLoading: false,
      };
    default:
      return state;
  }
}
