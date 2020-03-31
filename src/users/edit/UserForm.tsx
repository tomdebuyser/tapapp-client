import React, { FC } from 'react';
import { IUserForm } from '../_models';
import { InputField, Button, ErrorMessage } from '../../_shared';
import { useForm } from '../../_hooks';
import { translations } from '../../_translations';
import RolesDropdown from '../../roles/edit/RolesDropdown';
import { ApiError } from '../../_http';
import './userForm.scss';
import { FormValidationErrors, SubmitFormFunction } from '../../_hooks/useForm';
import { formValidator } from '../../_utils/formValidation';

interface Props {
  buttons?: JSX.Element | JSX.Element[];
  error?: ApiError;
  initialForm: IUserForm;
  isSubmitting?: boolean;
  submitForm: SubmitFormFunction<IUserForm>;
  userId?: string;
}

type IUserFormErrors = IUserForm & {
  roleIds?: string;
};

function errorAsString(error?: ApiError): string {
  if (error?.error === 'EMAIL_ALREADY_IN_USE') return translations.getLabel(`USERS.ERRORS.EMAIL_ALREADY_IN_USE`);
  if (error?.error === 'PERMISSION_DENIED') return translations.getLabel(`ERRORS.PERMISSION_DENIED`);
  return null;
}

const UserForm: FC<Props> = ({ userId, initialForm, submitForm, isSubmitting, error, buttons }) => {
  function validateForm(values: IUserForm): FormValidationErrors<IUserFormErrors> {
    const errors: FormValidationErrors<IUserFormErrors> = {};
    if (values.email) errors.email = formValidator.email(values.email).error;
    else if (!userId) errors.email = formValidator.required(values.email).error;
    errors.roleIds = formValidator.notEmptyArray(values.roleIds).error;
    return errors;
  }

  const form = useForm<IUserForm, IUserFormErrors>({ error, initialForm, submitForm, validateForm });
  const errorMessage = errorAsString(error);

  return (
    <form onSubmit={form.submit}>
      <ErrorMessage isGlobal isVisible={!!errorMessage}>
        {errorMessage}
      </ErrorMessage>
      {!userId && (
        <div role="group">
          <InputField
            errorMessage={form.validationErrors.email}
            label={translations.getLabel('USERS.EMAIL')}
            name="email"
            onChange={form.setSimpleAttribute}
            type="email"
            value={form.values.email}
          />
          <div />
        </div>
      )}
      <div role="group">
        <InputField
          errorMessage={form.validationErrors.firstName}
          label={translations.getLabel('USERS.FIRST_NAME')}
          name="firstName"
          onChange={form.setSimpleAttribute}
          type="text"
          value={form.values.firstName}
        />
        <InputField
          errorMessage={form.validationErrors.lastName}
          label={translations.getLabel('USERS.LAST_NAME')}
          name="lastName"
          onChange={form.setSimpleAttribute}
          type="text"
          value={form.values.lastName}
        />
      </div>
      <div role="group">
        <RolesDropdown
          errorMessage={form.validationErrors.roleIds}
          label={translations.getLabel('USERS.ROLE')}
          name="roleIds"
          onChange={form.setSimpleAttribute}
          value={form.values.roleIds}
        />
        <div />
      </div>
      <div className="actions">
        {buttons}
        <Button loading={isSubmitting} primary type="submit">
          {translations.getLabel(userId ? 'SHARED.BUTTONS.SAVE' : 'SHARED.BUTTONS.CREATE')}
        </Button>
      </div>
    </form>
  );
};

export default UserForm;
