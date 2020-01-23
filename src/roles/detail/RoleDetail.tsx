import React, { FC } from 'react';
import { Container } from 'semantic-ui-react';
import { Redirect, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { GoBackLink, Timestamps } from '../../_shared';
import { translations } from '../../_translations';
import { rolesSelectors } from '../../_store/selectors';
import { IRoleForm } from '../_models/Role';
import RoleForm from '../edit/RoleForm';
import { rolesActions } from '../../_store/actions';

const RoleDetail: FC = () => {
  const { id } = useParams();
  const role = useSelector(rolesSelectors.role(id));
  const isUpdateLoading = useSelector(rolesSelectors.isUpdateRoleLoading);
  const errorUpdateRole = useSelector(rolesSelectors.errorUpdateRole);
  const dispatch = useDispatch();

  if (!role) return <Redirect to="/roles" />;

  function renderHeader() {
    return (
      <header>
        <h1>{role.name}</h1>
        <Timestamps entity={role} />
      </header>
    );
  }

  function renderDetailsSection() {
    const initialForm: IRoleForm = {
      name: role.name,
      permissions: role.permissions,
    };
    return (
      <section>
        <RoleForm
          error={errorUpdateRole}
          initialForm={initialForm}
          isSubmitting={isUpdateLoading}
          roleId={role.id}
          submitForm={(form: IRoleForm) => dispatch(new rolesActions.UpdateRole({ roleId: role.id, form }))}
        />
      </section>
    );
  }

  return (
    <Container as="main" className="form-container">
      <GoBackLink label={translations.getLabel('ROLES.DETAIL.BACK')} to="/roles" />
      {renderHeader()}
      {renderDetailsSection()}
    </Container>
  );
};

export default RoleDetail;
