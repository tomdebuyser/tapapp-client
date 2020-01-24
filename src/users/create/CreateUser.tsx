import React, { FC } from 'react';
import { Container } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { translations } from '../../_translations';
import { usersSelectors } from '../../_store/selectors';
import { usersActions } from '../../_store/actions';
import { IUserForm } from '../_models/User';
import UserForm from '../edit/UserForm';
import { Button } from '../../_shared';

const initialForm: IUserForm = {
  email: '',
  firstName: '',
  lastName: '',
  roleIds: [],
};

const CreateUser: FC = () => {
  const dispatch = useDispatch();
  const isSubmitting = useSelector(usersSelectors.isCreateUserLoading);
  const error = useSelector(usersSelectors.errorCreateUser);

  return (
    <Container as="main">
      <h1>{translations.getLabel('USERS.CREATE.TITLE')}</h1>
      <UserForm
        buttons={
          <Button href="/users" isTextLink>
            {translations.getLabel('SHARED.BUTTONS.CANCEL')}
          </Button>
        }
        error={error}
        initialForm={initialForm}
        isSubmitting={isSubmitting}
        submitForm={(form: IUserForm) => dispatch(new usersActions.CreateUser(form))}
      />
    </Container>
  );
};

export default CreateUser;