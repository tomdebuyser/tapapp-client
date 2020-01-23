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
import { FormValidationErrors } from '../../_hooks/useForm';
import { FormValidator } from '../../_utils/form-validation';

const initialForm: IRoleForm = {
  name: '',
  permissions: {
    roles: { view: false, edit: false },
    users: { view: false, edit: false },
  },
};

function validateForm(form: IRoleForm): FormValidationErrors<IRoleForm> {
  return {
    name: FormValidator.isRequired(form.name),
  };
}

const CreateRole = () => {
  const dispatch = useDispatch();
  const isSubmitting = useSelector(rolesSelectors.isCreateRoleLoading);
  const error = useSelector(rolesSelectors.errorCreateRole);
  const { Form } = useForm<IRoleForm>({
    initialForm,
    submitForm: form => dispatch(new rolesActions.CreateRole(form)),
    validateForm,
  });

  const setPermissions = (_: FormEvent, data: CheckboxProps) => {
    Form.setAttribute(setInObject(Form.values.permissions, data.name, data.checked), 'permissions');
  };

  return (
    <Container as="main" className="create-role">
      <h1>{translations.getLabel('ROLES.CREATE.TITLE')}</h1>
      <form onSubmit={Form.submit}>
        <InputField
          errorMessage={Form.validationErrors.name}
          label={translations.getLabel('ROLES.CREATE.NAME')}
          name="name"
          onChange={Form.setAttribute}
          type="text"
          value={Form.values.name}
        />
        <div className="permissions">
          <h2>{translations.getLabel('ROLES.CREATE.PERMISSIONS')}</h2>
          {Object.keys(Form.values.permissions).map(permission => (
            <fieldset key={permission}>
              <legend>{translations.getLabel(`ROLES.CREATE.${permission.toUpperCase()}`)}</legend>
              <div>
                {Object.keys(Form.values.permissions[permission]).map(option => {
                  const optionName = `${permission}.${option}`;
                  return (
                    <Checkbox
                      checked={Form.values.permissions[permission][option]}
                      id={optionName}
                      key={optionName}
                      label={translations.getLabel(`ROLES.CREATE.${option.toUpperCase()}`)}
                      name={optionName}
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
          <Button loading={isSubmitting} primary type="submit">
            {translations.getLabel('SHARED.BUTTONS.CREATE')}
          </Button>
          <Button href="/roles" isTextLink>
            {translations.getLabel('SHARED.BUTTONS.CANCEL')}
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default CreateRole;
