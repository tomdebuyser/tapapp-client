import React, { FC } from 'react';
import { Container } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { translations } from '../../_translations';
import { usersSelectors } from '../../_store/selectors';
import { usersActions } from '../../_store/actions';
import { IUserForm } from '../_models';
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
  const error = useSelector(usersSelectors.errorCrudUsers);

  return (
    <Container as="main" className="left-container">
      <header>
        <h1>{translations.getLabel('USERS.CREATE.TITLE')}</h1>
      </header>
      <section>
        <UserForm
          buttons={<Button href="/users">{translations.getLabel('SHARED.BUTTONS.CANCEL')}</Button>}
          error={error}
          initialForm={initialForm}
          isSubmitting={isSubmitting}
          submitForm={(values: IUserForm) => dispatch(new usersActions.CreateUser({ values }))}
        />
      </section>
    </Container>
  );
};

export default CreateUser;
