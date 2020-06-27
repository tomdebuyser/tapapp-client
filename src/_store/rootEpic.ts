import { combineEpics } from 'redux-observable';
import authEpics from '../auth/_store/epics';
import categoriesEpics from '../categories/_store/epics';
import modalEpics from '../modal/_store/epics';
import orderEpics from '../order/_store/epics';
import ordersEpics from '../orders/_store/epics';
import payconiqEpics from '../payconiq/_store/epics';

const rootEpic = combineEpics(...authEpics, ...categoriesEpics, ...modalEpics, ...payconiqEpics, ...orderEpics, ...ordersEpics);

export default rootEpic;
