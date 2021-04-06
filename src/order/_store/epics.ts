import { Epic } from 'redux-observable';
import { from, of } from 'rxjs';
import { map, catchError, exhaustMap, filter, switchMap, tap } from 'rxjs/operators';
import { push } from 'connected-react-router';
import { orderActions, modalActions } from '../../_store/actions';
import { orderSelectors } from '../../_store/selectors';
import { IOrderFinishedRouterState } from '../finished/OrderFinished';
import { I18n } from '../../_translations';
import * as orderApi from './api';
import { OrderActionType } from './actions';

const clearStateEpic$: Epic = action$ => action$.ofType(OrderActionType.ClearState).pipe(map(() => push('/order/compose')));

const getOrderEpic$: Epic = action$ =>
  action$.ofType(OrderActionType.GetOrder).pipe(
    exhaustMap(({ payload }: orderActions.GetOrder) =>
      from(orderApi.getOrder(payload.orderId)).pipe(
        map(order => new orderActions.GetOrderSuccess({ order })),
        catchError(error => of(new orderActions.GetOrderError({ error }))),
      ),
    ),
  );

const createOrderEpic$: Epic = (action$, state$) =>
  action$.ofType(OrderActionType.CreateOrder).pipe(
    exhaustMap(() => {
      const items = orderSelectors.items(state$.value);
      return from(orderApi.createOrder(items)).pipe(
        map(createdOrder => new orderActions.CreateOrderSuccess({ createdOrder })),
        catchError(error => of(new orderActions.CreateOrderError({ error }))),
      );
    }),
  );

const updateOrderEpic$: Epic = (action$, state$) =>
  action$.ofType(OrderActionType.UpdateOrder).pipe(
    exhaustMap(() => {
      const orderId = orderSelectors.orderId(state$.value);
      const items = orderSelectors.items(state$.value);
      return from(orderApi.updateOrder(orderId, items)).pipe(
        map(updatedOrder => new orderActions.UpdateOrderSuccess({ updatedOrder })),
        catchError(error => of(new orderActions.UpdateOrderError({ error }))),
      );
    }),
  );

const receivedOrderEpic$: Epic = action$ =>
  action$
    .ofType(OrderActionType.GetOrderSuccess, OrderActionType.CreateOrderSuccess, OrderActionType.UpdateOrderSuccess)
    .pipe(map(() => push('/order/checkout')));

const addClientNameEpic$: Epic = (action$, state$) =>
  action$.ofType(OrderActionType.AddClientName).pipe(
    exhaustMap(({ payload }: orderActions.AddClientName) => {
      const orderId = orderSelectors.orderId(state$.value);
      return from(orderApi.updateOrder(orderId, null, payload.clientName)).pipe(
        tap(() => payload.onSuccess?.()),
        switchMap(updatedOrder =>
          of(
            new orderActions.AddClientNameSuccess({ updatedOrder }),
            push<IOrderFinishedRouterState>('/order/success', {
              text: I18n.labels.ORDER.FINISHED.EXPLANATION.ADDED_CLIENT_NAME,
            }),
          ),
        ),
        catchError(error => of(new orderActions.AddClientNameError({ error }))),
      );
    }),
  );

const deleteOrderWithConfirmationEpic$: Epic = action$ =>
  action$.ofType(OrderActionType.DeleteOrder).pipe(
    filter(({ payload }: orderActions.DeleteOrder) => !payload?.confirmed),
    map(
      () =>
        new modalActions.ShowConfirmationModal({
          confirmAction: () => new orderActions.DeleteOrder({ confirmed: true }),
          confirmText: I18n.labels.ORDER.CONFIRM_DELETE.BUTTON,
          content: I18n.labels.ORDER.CONFIRM_DELETE.CONTENT,
          title: I18n.labels.ORDER.CONFIRM_DELETE.TITLE,
        }),
    ),
  );

const deleteOrderEpic$: Epic = (action$, state$) =>
  action$.ofType(OrderActionType.DeleteOrder).pipe(
    filter(({ payload }: orderActions.DeleteOrder) => payload?.confirmed),
    map(() => orderSelectors.orderId(state$.value)),
    filter(orderId => !!orderId),
    exhaustMap(orderId =>
      from(orderApi.deleteOrder(orderId)).pipe(
        switchMap(() => of(new orderActions.DeleteOrderSuccess(), new orderActions.ClearState())),
        catchError(error => of(new orderActions.DeleteOrderError({ error }))),
      ),
    ),
  );

const cancelCreateOrderEpic$: Epic = (action$, state$) =>
  action$.ofType(OrderActionType.DeleteOrder).pipe(
    filter(({ payload }: orderActions.DeleteOrder) => payload?.confirmed),
    filter(() => !orderSelectors.orderId(state$.value)),
    map(() => new orderActions.ClearState()),
  );

const payOrderEpic$: Epic = (action$, state$) =>
  action$.ofType(OrderActionType.PayOrder).pipe(
    exhaustMap(({ payload }: orderActions.PayOrder) => {
      const orderId = orderSelectors.orderId(state$.value);
      return from(orderApi.payOrder(orderId, payload.paymentType)).pipe(
        switchMap(() => of(new orderActions.PayOrderSuccess(), push('/order/success'))),
        catchError(error => of(new orderActions.PayOrderError({ error }))),
      );
    }),
  );

export default [
  clearStateEpic$,
  getOrderEpic$,
  createOrderEpic$,
  updateOrderEpic$,
  receivedOrderEpic$,
  addClientNameEpic$,
  deleteOrderWithConfirmationEpic$,
  deleteOrderEpic$,
  cancelCreateOrderEpic$,
  payOrderEpic$,
];
