import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import { modalsSelectors } from '../_store/selectors';
import { ModalType, IConfirmationModalData } from './_models';
import ConfirmationModal from './confirmation/ConfirmationModal';

const ReduxDelegatedModal: FC = () => {
  const isOpen = useSelector(modalsSelectors.isOpen);
  const data = useSelector(modalsSelectors.data);
  const type = useSelector(modalsSelectors.type);

  if (!isOpen) return null;
  switch (type) {
    case ModalType.Confirmation:
      return <ConfirmationModal data={data as IConfirmationModalData} />;
    default:
      return null;
  }
};

export default ReduxDelegatedModal;
