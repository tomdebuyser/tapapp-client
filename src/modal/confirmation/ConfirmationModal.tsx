import React, { FC } from 'react';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import { Button } from '../../_shared';
import { I18n } from '../../_translations';
import Modal from '../Modal';
import { ModalOpener } from '../ModalOpener';

type Props = {
  confirmText: string;
  content: string;
  onCancel?: () => void;
  onConfirm: (dispatch: Dispatch) => void;
  title: string;
};

const ConfirmationModal: FC<Props> = ({ confirmText, content, onCancel, onConfirm, title }) => {
  const dispatch = useDispatch();
  return (
    <Modal onCancel={onCancel}>
      <Modal.Header>{title}</Modal.Header>
      <Modal.Content>
        <p>{content}</p>
      </Modal.Content>
      <Modal.Buttons>
        <Button
          onClick={() => {
            onCancel?.();
            ModalOpener.instance.close();
          }}
        >
          {I18n.labels.SHARED.BUTTONS.CANCEL}
        </Button>
        <Button
          onClick={() => {
            onConfirm(dispatch);
            ModalOpener.instance.close();
          }}
          primary
        >
          {confirmText}
        </Button>
      </Modal.Buttons>
    </Modal>
  );
};

export default Object.assign(ConfirmationModal, {
  render: (props: Props) => {
    return <ConfirmationModal {...props} />;
  },
});
