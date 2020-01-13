import React, { FC, ReactNode } from 'react';
import { Modal as SemanticModal } from 'semantic-ui-react';
import Icon from '../icon/Icon';

import './modal.scss';

interface Props {
  children: ReactNode;
  className?: string;
  onClose?: () => void;
  onOpen?: () => void;
  open: boolean;
  trigger?: ReactNode;
}

const Modal: FC<Props> & { Actions, Content; Header; } = ({ className, open, onOpen, onClose, trigger, children }) => {
  return (
    <SemanticModal
      className={`base-modal ${className}`}
      open={open}
      onOpen={onOpen}
      onClose={onClose}
      trigger={trigger}
      closeIcon={<Icon className="close-icon" name="SvgClose" size={2.4} />}
    >
      {children}
    </SemanticModal>
  );
};

Modal.Header = SemanticModal.Header;
Modal.Content = SemanticModal.Content;
Modal.Actions = SemanticModal.Actions;

export default Modal;
