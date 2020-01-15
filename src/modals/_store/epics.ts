import { Epic } from 'redux-observable';
import { map } from 'rxjs/operators';
import { LOCATION_CHANGE } from 'connected-react-router';

import { CloseModalAction } from './actions';

export const locationChangeEpic$: Epic = action$ => action$.ofType(LOCATION_CHANGE).pipe(map(() => new CloseModalAction()));

const ModalEpics = [locationChangeEpic$];

export default ModalEpics;
