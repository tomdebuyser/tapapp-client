import { Action } from 'redux';

import { IConfirmationModalData } from '../_models';

export enum ActionType {
  ShowConfirmationModal = '[Modal] ShowConfirmationModal',
  CloseModal = '[Modal] CloseModal',
}

export class ShowConfirmationModalAction implements Action<ActionType> {
  readonly type = ActionType.ShowConfirmationModal;
  constructor(public payload: { data: IConfirmationModalData }) {}
}

export class CloseModalAction implements Action<ActionType> {
  readonly type = ActionType.CloseModal;
}

export type Actions = ShowConfirmationModalAction | CloseModalAction;
