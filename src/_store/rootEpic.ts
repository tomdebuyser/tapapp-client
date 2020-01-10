import { combineEpics } from 'redux-observable';
import RolesEpics from '../roles/_store/epics';
import UsersEpics from '../users/_store/epics';

const rootEpic = combineEpics(...RolesEpics, ...UsersEpics);

export default rootEpic;
