import React from 'react';
import { useModal } from '../../_hooks';
import { translations } from '../../_translations';
import { Button } from '../../_shared';
import ChangePasswordModal from './modals/ChangePasswordModal';

import './changePassword.scss';

const ChangePassword = () => {
  const [renderChangePasswordModal, showChangePasswordModal] = useModal(modalProps => <ChangePasswordModal {...modalProps} />);

  return (
    <section className="section-change-password">
      <h2>{translations.getLabel('AUTH.CHANGE_PASSWORD.TITLE')}</h2>
      <div>{translations.getLabel('AUTH.CHANGE_PASSWORD.DESCRIPTION')}</div>
      {renderChangePasswordModal()}
      <div className="actions">
        <Button className="show-modal" onClick={() => showChangePasswordModal()}>
          {translations.getLabel('AUTH.CHANGE_PASSWORD.TITLE')}
        </Button>
      </div>
    </section>
  );
};

export default ChangePassword;
