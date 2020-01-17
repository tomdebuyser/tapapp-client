import React, { FC } from 'react';
import { Container } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { translations } from '../../_translations';
import { Button, InputField } from '../../_shared';
import { usersSelectors } from '../../_store/selectors';
import { usersActions } from '../../_store/actions';
import ErrorMessage from '../../_shared/errorMessage/ErrorMessage';
import { IUserForm } from '../_models/User';
import { useForm } from '../../_hooks';
import RolesDropdown from '../../roles/rolesDropdown/RolesDropdown';
import './createUser.scss';

const initialForm: IUserForm = {
  email: '',
  firstName: '',
  lastName: '',
  roleIds: [],
};

const CreateUser: FC = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(usersSelectors.isCreateUserLoading);
  const error = useSelector(usersSelectors.errorCreateUser);
  const { form, setFormAttribute } = useForm(initialForm);
  const submitUser = (event: React.FormEvent): void => {
    event.preventDefault();
    dispatch(new usersActions.CreateUser(form));
  };

  return (
    <Container as="main" className="create-user">
      <h1>{translations.getLabel('USERS.CREATE.TITLE')}</h1>
      <form onSubmit={submitUser}>
        <InputField
          type="string"
          name="email"
          value={form.email}
          onChange={setFormAttribute}
          label={translations.getLabel('USERS.EMAIL')}
        />
        <div role="group">
          <InputField
            type="string"
            name="firstName"
            value={form.firstName}
            onChange={setFormAttribute}
            label={translations.getLabel('USERS.FIRST_NAME')}
          />
          <InputField
            type="string"
            name="lastName"
            value={form.lastName}
            onChange={setFormAttribute}
            label={translations.getLabel('USERS.LAST_NAME')}
          />
        </div>
        <RolesDropdown
          label={translations.getLabel('USERS.ROLE')}
          name="roleIds"
          value={form.roleIds}
          onChange={setFormAttribute}
        />
        <ErrorMessage isVisible={!!error}>{error?.message}</ErrorMessage>
        <div className="actions">
          <Button primary type="submit" loading={isLoading}>
            {translations.getLabel('SHARED.BUTTONS.CREATE')}
          </Button>
          <Button isTextLink href="/users">
            {translations.getLabel('SHARED.BUTTONS.CANCEL')}
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default CreateUser;
