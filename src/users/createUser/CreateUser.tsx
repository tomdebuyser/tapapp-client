import React, { FC, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { translations } from '../../_translations';
import './createUser.scss';
import { Button } from '../../_shared';
import InputField from '../../_shared/inputField/InputField';

const CreateUser: FC = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const submitUser = (event: React.FormEvent): void => {
    event.preventDefault();
    console.log({ email, firstName, lastName });
  };

  return (
    <Container as="main" className="create-user">
      <h1>{translations.getLabel('USERS.CREATE_USER')}</h1>
      <form onSubmit={submitUser}>
        <InputField type="string" name="email" value={email} onChange={setEmail} label={translations.getLabel('USERS.EMAIL')} />
        <div role="group">
          <InputField type="string" name="firstName" value={firstName} onChange={setFirstName} label={translations.getLabel('USERS.FIRST_NAME')} />
          <InputField type="string" name="lastName" value={lastName} onChange={setLastName} label={translations.getLabel('USERS.LAST_NAME')} />
        </div>
        <div className="actions">
          <Button primary type="submit">
            {translations.getLabel('BUTTONS.CREATE')}
          </Button>
          <Button isTextLink href="/users">
            {translations.getLabel('BUTTONS.CANCEL')}
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default CreateUser;
