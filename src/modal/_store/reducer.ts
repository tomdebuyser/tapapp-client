import { ModalType, IModalData } from '../_models';
import { ModalActionType, ModalAction } from './actions';

export interface ModalState {
  isOpen: boolean;
  data?: IModalData;
  type?: ModalType;
}

const initialState: ModalState = {
  isOpen: false,
};

const actionTypeToModalType = {
  [ModalActionType.ShowConfirmationModal]: ModalType.Confirmation,
};

export default function reducer(state = initialState, action: ModalAction): ModalState {
  switch (action.type) {
    case ModalActionType.ShowConfirmationModal:
      return {
        ...state,
        isOpen: true,
        type: actionTypeToModalType[action.type],
        data: action.payload,
      };
    case ModalActionType.CloseModal:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
