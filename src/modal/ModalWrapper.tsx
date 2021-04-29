import React, { FC, ReactNode, useEffect, useState } from 'react';
import classnames from 'classnames';
import { useToggle } from '../_hooks';
import { ModalOpener } from './ModalOpener';
import './modalWrapper.scss';

const ModalWrapper: FC = () => {
  const [isVisible, setIsVisible] = useToggle(false);
  const [children, setChildren] = useState<ReactNode>(null);

  useEffect(() => {
    ModalOpener.initialize((render: () => ReactNode) => setChildren(render()));
  }, []);

  useEffect(() => {
    setIsVisible(!!children);
  }, [children]);

  return (
    <div className={classnames('modal-wrapper', { 'is-visible': isVisible })}>
      <div className="modal-wrapper-content">{children}</div>
    </div>
  );
};

export default ModalWrapper;
