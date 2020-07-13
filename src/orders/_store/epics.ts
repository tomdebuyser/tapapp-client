import { Epic } from 'redux-observable';
import { from, of } from 'rxjs';
import { map, catchError, exhaustMap, filter, switchMap } from 'rxjs/operators';
import { push } from 'connected-react-router';
import { ordersActions, modalActions } from '../../_store/actions';
import { translations } from '../../_translations';
import { orderSelectors } from '../../_store/selectors';
import { IOrderFinishedRouterState } from '../../order/finished/OrderFinished';
import * as ordersApi from './api';
import { OrdersActionType } from './actions';

const getUnfinishedOrdersEpic$: Epic = action$ =>
  action$.ofType(OrdersActionType.GetUnfinishedOrders).pipe(
    exhaustMap(() =>
      from(ordersApi.getUnfinishedOrders()).pipe(
        map(orders => new ordersActions.GetUnfinishedOrdersSuccess({ orders })),
        catchError(error => of(new ordersActions.GetUnfinishedOrdersError({ error }))),
      ),
    ),
  );

const mergeOrdersWithConfirmationEpic$: Epic = action$ =>
  action$.ofType(OrdersActionType.MergeOrders).pipe(
    filter(({ payload }: ordersActions.MergeOrders) => !payload?.confirmed),
    map(
      ({ payload }: ordersActions.MergeOrders) =>
        new modalActions.ShowConfirmationModal({
          confirmAction: () => new ordersActions.MergeOrders({ confirmed: true, targetOrder: payload.targetOrder }),
          confirmText: translations.getLabel('ORDERS.CONFIRM_MERGE.BUTTON'),
          content: translations.getLabel('ORDERS.CONFIRM_MERGE.CONTENT', {
            name: payload.targetOrder.clientName || translations.getLabel('ORDERS.UNFINISHED.ITEM.NO_NAME'),
          }),
          title: translations.getLabel('ORDERS.CONFIRM_MERGE.TITLE'),
        }),
    ),
  );

const mergeOrdersEpic$: Epic = (action$, state$) =>
  action$.ofType(OrdersActionType.MergeOrders).pipe(
    filter(({ payload }: ordersActions.MergeOrders) => payload?.confirmed),
    exhaustMap(({ payload }: ordersActions.MergeOrders) => {
      const orderId = orderSelectors.orderId(state$.value);
      return from(ordersApi.mergeOrders(orderId, payload.targetOrder.id)).pipe(
        switchMap(() =>
          of(
            new ordersActions.MergeOrdersSuccess(),
            push<IOrderFinishedRouterState>('/order/success', {
              text: translations.getLabel('ORDER.FINISHED.EXPLANATION.ORDERS_MERGED'),
            }),
          ),
        ),
        catchError(error => of(new ordersActions.MergeOrdersError({ error }))),
      );
    }),
  );

export default [getUnfinishedOrdersEpic$, mergeOrdersWithConfirmationEpic$, mergeOrdersEpic$];
