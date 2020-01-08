import React, { FC, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { translations } from '../../_translations';
import { Button } from '../../_shared';
import InputField from '../../_shared/inputField/InputField';
import './createUser.scss';
import { usersSelectors } from '../../_store/selectors';
import { usersActions } from '../../_store/actions';
import ErrorMessage from '../../_shared/errorMessage/ErrorMessage';
import { IUserForm } from '../_models/User';

const initialForm: IUserForm = {
  email: '',
  firstName: '',
  lastName: '',
};

const CreateUser: FC = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(usersSelectors.isCreateUserLoading);
  const error = useSelector(usersSelectors.errorCreateUser);
  const [userForm, setUserForm] = useState(initialForm);
  const submitUser = (event: React.FormEvent): void => {
    event.preventDefault();
    dispatch(new usersActions.CreateUser(userForm));
  };

  const setFormAttribute = (value: string, name: string) => {
    setUserForm({ ...userForm, [name]: value });
  };

  return (
    <Container as="main" className="create-user">
      <h1>{translations.getLabel('USERS.CREATE_USER')}</h1>
      <form onSubmit={submitUser}>
        <InputField
          type="string"
          name="email"
          value={userForm.email}
          onChange={setFormAttribute}
          label={translations.getLabel('USERS.EMAIL')}
        />
        <div role="group">
          <InputField
            type="string"
            name="firstName"
            value={userForm.firstName}
            onChange={setFormAttribute}
            label={translations.getLabel('USERS.FIRST_NAME')}
          />
          <InputField
            type="string"
            name="lastName"
            value={userForm.lastName}
            onChange={setFormAttribute}
            label={translations.getLabel('USERS.LAST_NAME')}
          />
        </div>
        <ErrorMessage isVisible={!!error}>{error?.message}</ErrorMessage>
        <div className="actions">
          <Button primary type="submit" loading={isLoading}>
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
