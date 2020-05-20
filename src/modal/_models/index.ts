import { Action } from 'redux';

export enum ModalType {
  Confirmation = 'CONFIRMATION',
}

export type IModalData = {
  content: string;
  title: string;
};

export type IConfirmationModalData = IModalData & {
  cancelAction?: () => Action;
  confirmAction?: () => Action;
  confirmText: string;
};
