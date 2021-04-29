import { LOCATION_CHANGE } from 'connected-react-router';
import { Epic } from 'redux-observable';
import { tap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ModalOpener } from '../../modal/ModalOpener';

const locationChangeEpic$: Epic = action$ =>
  action$.ofType(LOCATION_CHANGE).pipe(
    tap(() => window.scrollTo(0, 0)),
    tap(() => ModalOpener.instance.closeAll()),
    switchMap(() => of()),
  );

export default [locationChangeEpic$];
