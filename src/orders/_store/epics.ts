import { Epic } from 'redux-observable';
import { from, of } from 'rxjs';
import { map, catchError, exhaustMap } from 'rxjs/operators';
import { ordersActions } from '../../_store/actions';
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

export default [getUnfinishedOrdersEpic$];
