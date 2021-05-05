import { Epic } from 'redux-observable';
import { from, of } from 'rxjs';
import { map, catchError, exhaustMap, switchMap, filter, tap, delay } from 'rxjs/operators';
import { push } from 'connected-react-router';
import { payconiqActions } from '../../_store/actions';
import { PayconiqPaymentStatus } from '../_models';
import { orderSelectors, payconiqSelectors } from '../../_store/selectors';
import { isIntermediatePayconiqStatus } from '../_models/rules';
import * as payconiqApi from './api';
import { PayconiqPaymentActionType } from './actions';

const getPayconiqPaymentEpic$: Epic = (action$, state$) =>
  action$.ofType(PayconiqPaymentActionType.GetPayconiqPayment).pipe(
    exhaustMap(() => {
      const payment = payconiqSelectors.payment(state$.value);
      return from(payconiqApi.getPayconiqPayment(payment.id)).pipe(
        map(payment => new payconiqActions.GetPayconiqPaymentSuccess({ payment })),
        catchError(error => of(new payconiqActions.GetPayconiqPaymentError({ error }))),
      );
    }),
  );

const getPayconiqPaymentSuccessEpic$: Epic = action$ =>
  action$.ofType(PayconiqPaymentActionType.GetPayconiqPaymentSuccess).pipe(
    filter(
      ({ payload }: payconiqActions.GetPayconiqPaymentSuccess) => payload.payment.status === PayconiqPaymentStatus.SUCCEEDED,
    ),
    tap(() => new Audio(require('../../_assets/sounds/notification.mp3')).play()),
    delay(2000),
    map(() => push('/order/success')),
  );

const createPayconiqPaymentEpic$: Epic = (action$, state$) =>
  action$.ofType(PayconiqPaymentActionType.CreatePayconiqPayment).pipe(
    exhaustMap(() => {
      const orderId = orderSelectors.orderId(state$.value);
      return from(payconiqApi.createPayconiqPayment(orderId)).pipe(
        map(payment => new payconiqActions.CreatePayconiqPaymentSuccess({ payment })),
        catchError(error => of(new payconiqActions.CreatePayconiqPaymentError({ error }))),
      );
    }),
  );

const cancelPayconiqPaymentEpic$: Epic = (action$, state$) =>
  action$.ofType(PayconiqPaymentActionType.CancelPayconiqPayment).pipe(
    exhaustMap(() => {
      const payment = payconiqSelectors.payment(state$.value);
      return from(payconiqApi.cancelPayconiqPayment(payment.id)).pipe(
        switchMap(() => of(new payconiqActions.CancelPayconiqPaymentSuccess(), new payconiqActions.ClearState())),
        catchError(error => of(new payconiqActions.CancelPayconiqPaymentError({ error }))),
      );
    }),
  );

const interruptPayconiqPaymentEpic$: Epic = (action$, state$) =>
  action$.ofType(PayconiqPaymentActionType.InterruptPayconiqPayment).pipe(
    map(() => {
      const payment = payconiqSelectors.payment(state$.value);
      if (isIntermediatePayconiqStatus(payment?.status)) return new payconiqActions.CancelPayconiqPayment();
      return new payconiqActions.ClearState();
    }),
  );

export default [
  getPayconiqPaymentEpic$,
  getPayconiqPaymentSuccessEpic$,
  createPayconiqPaymentEpic$,
  cancelPayconiqPaymentEpic$,
  interruptPayconiqPaymentEpic$,
];
