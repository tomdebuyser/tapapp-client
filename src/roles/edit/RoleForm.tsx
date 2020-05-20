import React, { FC } from 'react';
import { translations } from '../../_translations';
import { Button, InputField, Checkbox, ErrorMessage } from '../../_shared';
import { useForm } from '../../_hooks';
import { IRoleForm } from '../_models';
import './roleForm.scss';
import { FormValidationErrors, SubmitFormFunction } from '../../_hooks/useForm';
import { formValidator } from '../../_utils/formValidation';
import { ApiError } from '../../_http';

type Props = {
  buttons?: JSX.Element | JSX.Element[];
  error?: ApiError;
  initialForm: IRoleForm;
  isSubmitting?: boolean;
  roleId?: string;
  submitForm: SubmitFormFunction<IRoleForm>;
};

function validateForm(values: IRoleForm): FormValidationErrors<IRoleForm> {
  return {
    name: formValidator.required(values.name),
  };
}

function errorAsString(error?: ApiError): string {
  if (error?.error === 'ROLE_IN_USE') return translations.getLabel(`ROLES.ERRORS.ROLE_IN_USE`);
  if (error?.error === 'ROLE_NAME_ALREADY_IN_USE') return translations.getLabel(`ROLES.ERRORS.ROLE_NAME_ALREADY_IN_USE`);
  if (error?.error === 'PERMISSION_DENIED') return translations.getLabel(`ERRORS.PERMISSION_DENIED`);
  return null;
}

const RoleForm: FC<Props> = ({ roleId, initialForm, submitForm, isSubmitting, error, buttons }) => {
  const form = useForm<IRoleForm>({ error, initialForm, submitForm, validateForm });
  const errorMessage = errorAsString(error);

  return (
    <form onSubmit={form.submit}>
      <ErrorMessage isGlobal isVisible={!!errorMessage}>
        {errorMessage}
      </ErrorMessage>
      <div role="group">
        <InputField
          label={translations.getLabel('ROLES.NAME')}
          name="name"
          onChange={form.setAttribute}
          required
          type="text"
          validation={form.validationErrors.name}
          value={form.values.name}
        />
        <div />
      </div>
      <div className="permissions">
        <h3>{translations.getLabel('ROLES.PERMISSIONS.TITLE')}</h3>
        {Object.keys(form.values.permissions).map(permission => (
          <fieldset key={permission}>
            <legend>{translations.getLabel(`ROLES.PERMISSIONS.FEATURES.${permission.toUpperCase()}`)}</legend>
            <div>
              {Object.keys(form.values.permissions[permission]).map(option => {
                const optionName = `${permission}.${option}`;
                return (
                  <Checkbox
                    checked={form.values.permissions[permission][option]}
                    key={optionName}
                    label={translations.getLabel(`ROLES.PERMISSIONS.RIGHTS.${option.toUpperCase()}`)}
                    name={optionName}
                    onChange={value => form.setValues(values => (values.permissions[permission][option] = value))}
                  />
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>
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
