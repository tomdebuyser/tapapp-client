import { combineEpics } from 'redux-observable';
import authEpics from '../auth/_store/epics';
import categoriesEpics from '../categories/_store/epics';
import modalEpics from '../modal/_store/epics';
import orderEpics from '../order/_store/epics';

const rootEpic = combineEpics(...authEpics, ...categoriesEpics, ...modalEpics, ...orderEpics);

export default rootEpic;
