import { ModalType, IModalData } from '../_models';
import { ActionType, Actions } from './actions';

export interface ModalState {
  isOpen: boolean;
  data?: IModalData;
  type?: ModalType;
}

const initialState: ModalState = {
  isOpen: false,
};

const actionTypeToModalType = {
  [ActionType.ShowConfirmationModal]: ModalType.Confirmation,
};

export default function reducer(state = initialState, action: Actions): ModalState {
  switch (action.type) {
    case ActionType.ShowConfirmationModal:
      return {
        ...state,
        isOpen: true,
        type: actionTypeToModalType[action.type],
        data: action.payload.data,
      };
    case ActionType.CloseModal:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
