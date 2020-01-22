import React, { FormEvent } from 'react';
import { Container, Checkbox, CheckboxProps } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { translations } from '../../_translations';
import ErrorMessage from '../../_shared/errorMessage/ErrorMessage';
import { Button, InputField } from '../../_shared';
import { rolesSelectors } from '../../_store/selectors';
import { useForm } from '../../_hooks';
import { IRoleForm } from '../_models/Role';
import { rolesActions } from '../../_store/actions';
import { setInObject } from '../../_utils/objectHelpers';
import './createRole.scss';

const initialForm: IRoleForm = {
  name: '',
  permissions: {
    roles: { view: false, edit: false },
    users: { view: false, edit: false },
  },
};

const CreateRole = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(rolesSelectors.isCreateRoleLoading);
  const error = useSelector(rolesSelectors.errorCreateRole);
  const { form, setFormAttribute } = useForm(initialForm);
  const submitUser = (event: React.FormEvent): void => {
    event.preventDefault();
    dispatch(new rolesActions.CreateRole(form));
  };

  const setPermissions = (_: FormEvent, data: CheckboxProps) => {
    setFormAttribute(setInObject(form.permissions, data.name, data.checked), 'permissions');
  };

  return (
    <Container as="main" className="create-role">
      <h1>{translations.getLabel('ROLES.CREATE.TITLE')}</h1>
      <form onSubmit={submitUser}>
        <InputField
          type="string"
          name="name"
          value={form.name}
          onChange={setFormAttribute}
          label={translations.getLabel('ROLES.CREATE.NAME')}
        />
        <div className="permissions">
          <h2>{translations.getLabel('ROLES.CREATE.PERMISSIONS')}</h2>
          {Object.keys(form.permissions).map(permission => (
            <fieldset key={permission}>
              <legend>{translations.getLabel(`ROLES.CREATE.${permission.toUpperCase()}`)}</legend>
              <div>
                {Object.keys(form.permissions[permission]).map(option => {
                  const optionName = `${permission}.${option}`;
                  return (
                    <Checkbox
                      key={optionName}
                      id={optionName}
                      name={optionName}
                      label={translations.getLabel(`ROLES.CREATE.${option.toUpperCase()}`)}
                      checked={form.permissions[permission][option]}
                      onChange={setPermissions}
                    />
                  );
                })}
              </div>
            </fieldset>
          ))}
        </div>
        <ErrorMessage isVisible={!!error}>{error?.message}</ErrorMessage>
        <div className="actions">
          <Button primary type="submit" loading={isLoading}>
            {translations.getLabel('SHARED.BUTTONS.CREATE')}
          </Button>
          <Button isTextLink href="/roles">
            {translations.getLabel('SHARED.BUTTONS.CANCEL')}
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default CreateRole;
