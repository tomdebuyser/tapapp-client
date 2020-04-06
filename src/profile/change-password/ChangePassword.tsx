import React from 'react';
import { Button } from 'semantic-ui-react';
import { translations } from '../../_translations';
import { useModal } from '../../_hooks';
import ChangePasswordModal from './modals/ChangePasswordModal';

const ChangePassword = () => {
  const [renderChangePasswordModal, showChangePasswordModal] = useModal(modalProps => <ChangePasswordModal {...modalProps} />);

  return (
    <section className="section-change-password">
      <h2>{translations.getLabel('AUTH.CHANGE_PASSWORD.TITLE')}</h2>
      <span>{translations.getLabel('AUTH.CHANGE_PASSWORD.DESCRIPTION')}</span>
      {renderChangePasswordModal()}
      <Button onClick={showChangePasswordModal}>{translations.getLabel('AUTH.CHANGE_PASSWORD.TITLE')}</Button>
    </section>
  );
};

export default ChangePassword;
