import React, { FC } from 'react';
import { Container } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { translations } from '../../_translations';
import { Button } from '../../_shared';
import { rolesSelectors } from '../../_store/selectors';
import { IRoleForm } from '../_models/Role';
import { rolesActions } from '../../_store/actions';
import RoleForm from '../edit/RoleForm';

const initialForm: IRoleForm = {
  name: '',
  permissions: {
    roles: { view: false, edit: false },
    users: { view: false, edit: false },
  },
};

const CreateRole: FC = () => {
  const dispatch = useDispatch();
  const isSubmitting = useSelector(rolesSelectors.isCreateRoleLoading);
  const error = useSelector(rolesSelectors.errorCreateRole);

  return (
    <Container as="main" className="create-role">
      <h1>{translations.getLabel('ROLES.CREATE.TITLE')}</h1>
      <RoleForm
        buttons={
          <Button href="/roles" isTextLink>
            {translations.getLabel('SHARED.BUTTONS.CANCEL')}
          </Button>
        }
        error={error}
        initialForm={initialForm}
        isSubmitting={isSubmitting}
        submitForm={(form: IRoleForm) => dispatch(new rolesActions.CreateRole(form))}
      />
    </Container>
  );
};

export default CreateRole;
