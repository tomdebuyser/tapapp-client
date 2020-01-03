import { combineEpics } from 'redux-observable';
import UsersEpics from '../users/_store/epics';

const rootEpic = combineEpics(...UsersEpics);

export default rootEpic;
