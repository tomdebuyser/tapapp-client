import { Epic } from 'redux-observable';
import { map } from 'rxjs/operators';
import { LOCATION_CHANGE } from 'connected-react-router';
import { modalActions } from '../../_store/actions';

export const locationChangeEpic$: Epic = action$ =>
  action$.ofType(LOCATION_CHANGE).pipe(map(() => new modalActions.CloseModal()));

const ModalEpics = [locationChangeEpic$];

export default ModalEpics;
