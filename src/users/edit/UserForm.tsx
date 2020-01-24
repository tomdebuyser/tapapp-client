import React, { FC } from 'react';
import { IUserForm } from '../_models';
import { InputField, Button } from '../../_shared';
import { useForm } from '../../_hooks';
import { translations } from '../../_translations';
import RolesDropdown from '../../roles/edit/RolesDropdown';
import ErrorMessage from '../../_shared/errorMessage/ErrorMessage';
import { ApiError } from '../../_http';
import './userForm.scss';
import { FormValidationErrors } from '../../_hooks/useForm';
import { FormValidator } from '../../_utils/form-validation';

interface Props {
  buttons?: JSX.Element | JSX.Element[];
  error?: ApiError;
  initialForm: IUserForm;
  isSubmitting?: boolean;
  submitForm: (form: IUserForm) => void;
  userId?: string;
}

function errorAsString(error?: ApiError): string {
  if (error?.error === 'EMAIL_ALREADY_IN_USE') return translations.getLabel(`USERS.ERRORS.EMAIL_ALREADY_IN_USE`);
  return null;
}

const UserForm: FC<Props> = ({ userId, initialForm, submitForm, isSubmitting, error, buttons }) => {
  function validateForm(form: IUserForm): FormValidationErrors<IUserForm> {
    const errors: FormValidationErrors<IUserForm> = {};
    if (form.email) errors.email = FormValidator.isEmail(form.email);
    else if (!userId) errors.email = FormValidator.isRequired(form.email);
    errors.roleIds = FormValidator.isNotEmptyArray(form.roleIds);
    return errors;
  }

  const { Form } = useForm<IUserForm>({ error, initialForm, submitForm, validateForm });

  return (
    <form className="form-container" onSubmit={Form.submit}>
      {!userId && (
        <div role="group">
          <InputField
            errorMessage={Form.validationErrors.email}
            label={translations.getLabel('USERS.EMAIL')}
            name="email"
            onChange={Form.setAttribute}
            type="email"
            value={Form.values.email}
          />
          <div />
        </div>
      )}
      <div role="group">
        <InputField
          errorMessage={Form.validationErrors.firstName}
          label={translations.getLabel('USERS.FIRST_NAME')}
          name="firstName"
          onChange={Form.setAttribute}
          type="text"
          value={Form.values.firstName}
        />
        <InputField
          errorMessage={Form.validationErrors.lastName}
          label={translations.getLabel('USERS.LAST_NAME')}
          name="lastName"
          onChange={Form.setAttribute}
          type="text"
          value={Form.values.lastName}
        />
      </div>
      <div role="group">
        <RolesDropdown
          errorMessage={Form.validationErrors.roleIds}
          label={translations.getLabel('USERS.ROLE')}
          name="roleIds"
          onChange={Form.setAttribute}
          value={Form.values.roleIds}
        />
        <div />
      </div>
      <ErrorMessage isVisible>{errorAsString(error)}</ErrorMessage>
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
