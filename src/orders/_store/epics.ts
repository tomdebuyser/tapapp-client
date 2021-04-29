import { Epic } from 'redux-observable';
import { from, of } from 'rxjs';
import { map, catchError, exhaustMap, filter, switchMap, tap } from 'rxjs/operators';
import { push } from 'connected-react-router';
import { ordersActions } from '../../_store/actions';
import { orderSelectors } from '../../_store/selectors';
import { IOrderFinishedRouterState } from '../../order/finished/OrderFinished';
import { I18n } from '../../_translations';
import { ModalOpener } from '../../modal/ModalOpener';
import ConfirmationModal from '../../modal/confirmation/ConfirmationModal';
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
    tap(payload => {
      ModalOpener.instance.open({
        render: () =>
          ConfirmationModal.render({
            confirmText: I18n.labels.ORDERS.CONFIRM_MERGE.BUTTON,
            content: I18n.insert(I18n.labels.ORDERS.CONFIRM_MERGE.CONTENT, {
              name: payload.targetOrder.clientName || I18n.labels.ORDERS.UNFINISHED.ITEM.NO_NAME,
            }),
            onConfirm: () => new ordersActions.MergeOrders({ confirmed: true, targetOrder: payload.targetOrder }),
            title: I18n.labels.ORDERS.CONFIRM_MERGE.TITLE,
          }),
      });
    }),
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
              text: I18n.labels.ORDER.FINISHED.EXPLANATION.ORDERS_MERGED,
            }),
          ),
        ),
        catchError(error => of(new ordersActions.MergeOrdersError({ error }))),
      );
    }),
  );

export default [getUnfinishedOrdersEpic$, mergeOrdersWithConfirmationEpic$, mergeOrdersEpic$];
