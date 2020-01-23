import React, { FormEvent, FC } from 'react';
import { Checkbox, CheckboxProps } from 'semantic-ui-react';
import { translations } from '../../_translations';
import ErrorMessage from '../../_shared/errorMessage/ErrorMessage';
import { Button, InputField } from '../../_shared';
import { useForm } from '../../_hooks';
import { IRoleForm } from '../_models/Role';
import { setInObject } from '../../_utils/objectHelpers';
import './roleForm.scss';
import { FormValidationErrors } from '../../_hooks/useForm';
import { FormValidator } from '../../_utils/form-validation';
import { ApiError } from '../../_http';

interface Props {
  buttons?: JSX.Element | JSX.Element[];
  error?: ApiError;
  initialForm: IRoleForm;
  isSubmitting?: boolean;
  roleId?: string;
  submitForm: (form: IRoleForm) => void;
}

function validateForm(form: IRoleForm): FormValidationErrors<IRoleForm> {
  return {
    name: FormValidator.isRequired(form.name),
  };
}

function errorAsString(error?: ApiError): string {
  if (error?.error === 'ROLE_IN_USE') return translations.getLabel(`ROLES.DELETE.ERRORS.ROLE_IN_USE`);
  if (error?.error === 'ROLE_NAME_ALREADY_IN_USE') return translations.getLabel(`ROLES.DELETE.ERRORS.ROLE_NAME_ALREADY_IN_USE`);
  return null;
}

const RoleForm: FC<Props> = ({ roleId, initialForm, submitForm, isSubmitting, error, buttons }) => {
  const { Form } = useForm<IRoleForm>({ initialForm, submitForm, validateForm });

  const setPermission = (_: FormEvent, data: CheckboxProps) => {
    Form.setAttribute(setInObject(Form.values.permissions, data.name, data.checked), 'permissions');
  };

  const errorMessage = errorAsString(error);

  return (
    <form className="form-container" onSubmit={Form.submit}>
      <div role="group">
        <InputField
          errorMessage={Form.validationErrors.name}
          label={translations.getLabel('ROLES.NAME')}
          name="name"
          onChange={Form.setAttribute}
          type="text"
          value={Form.values.name}
        />
        <div />
      </div>
      <div className="permissions">
        <h3>{translations.getLabel('ROLES.PERMISSIONS.TITLE')}</h3>
        {Object.keys(Form.values.permissions).map(permission => (
          <fieldset key={permission}>
            <legend>{translations.getLabel(`ROLES.PERMISSIONS.FEATURES.${permission.toUpperCase()}`)}</legend>
            <div>
              {Object.keys(Form.values.permissions[permission]).map(option => {
                const optionName = `${permission}.${option}`;
                return (
                  <Checkbox
                    checked={Form.values.permissions[permission][option]}
                    id={optionName}
                    key={optionName}
                    label={translations.getLabel(`ROLES.PERMISSIONS.RIGHTS.${option.toUpperCase()}`)}
                    name={optionName}
                    onChange={setPermission}
                  />
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>
      <ErrorMessage isVisible={!!errorMessage}>{errorMessage}</ErrorMessage>
      <div className="actions">
        {buttons}
        <Button loading={isSubmitting} primary type="submit">
          {translations.getLabel(roleId ? 'SHARED.BUTTONS.SAVE' : 'SHARED.BUTTONS.CREATE')}
        </Button>
      </div>
    </form>
  );
};

export default RoleForm;
