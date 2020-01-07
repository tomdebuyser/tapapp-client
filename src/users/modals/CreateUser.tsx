import React, { FC, useState, ChangeEvent } from 'react';
import { Button as SemanticButton, Input } from 'semantic-ui-react';
import { Modal } from '../../_shared';
import { translations } from '../../_translations';
import './createUser.scss';

interface Props {
  hideModal: () => void;
}

const CreateUser: FC<Props> = ({ hideModal }) => {
  const [email, setEmail] = useState('');
  const submitUser = (event: React.FormEvent): void => {
    event.preventDefault();
    console.log(email);
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value);

  return (
    <Modal className="edit-team-modal" open onClose={hideModal}>
      <Modal.Header>{translations.getLabel('USERS.CREATE_USER')}</Modal.Header>
      <Modal.Content>
        <form onSubmit={submitUser}>
          <label htmlFor="email">{translations.getLabel('USERS.EMAIL')}</label>
          <Input type="string" id="email" onChange={onChange} />
        </form>
      </Modal.Content>
      <Modal.Actions>
        <SemanticButton>{translations.getLabel('BUTTONS.CANCEL')}</SemanticButton>
        <SemanticButton>{translations.getLabel('BUTTONS.CREATE')}</SemanticButton>
      </Modal.Actions>
    </Modal>
  );
};

export default CreateUser;
