import React, { FC, ReactNode } from 'react';
import classnames from 'classnames';
import { Icon } from '../_shared';
import { ModalOpener } from './ModalOpener';
import './modal.scss';

type Props = {
  children: ReactNode;
  className?: string;
  onCancel?: () => void;
};

const Header: FC<{ children: ReactNode }> = ({ children }) => (
  <header className="modal-header">
    <h1>{children}</h1>
  </header>
);

const Content: FC<{ children: ReactNode }> = ({ children }) => <div className="modal-content">{children}</div>;

const Buttons: FC<{ children: ReactNode }> = ({ children }) => <div className="modal-buttons">{children}</div>;

const Modal: FC<Props> = ({ children, className = '', onCancel }) => {
  const cancelModal = () => {
    onCancel?.();
    ModalOpener.instance.close();
  };

  return (
    <>
      <button className="modal-dimmer" onClick={cancelModal} type="button" />
      <div className={classnames('modal', className)}>
        <div className="modal-box">{children}</div>
        <div className="modal-close-icon">
          <Icon name="SvgClose" onClick={cancelModal} size={3} />
        </div>
      </div>
    </>
  );
};

export default Object.assign(Modal, { Buttons, Content, Header });
