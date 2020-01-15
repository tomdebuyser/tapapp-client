import { combineEpics } from 'redux-observable';
import AuthEpics from '../auth/_store/epics';
import RolesEpics from '../roles/_store/epics';
import UsersEpics from '../users/_store/epics';
import ModalEpics from '../modals/_store/epics';

const rootEpic = combineEpics(...RolesEpics, ...UsersEpics, ...AuthEpics, ...ModalEpics);

export default rootEpic;
