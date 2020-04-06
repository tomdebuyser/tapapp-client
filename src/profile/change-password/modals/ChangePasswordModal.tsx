import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, InputField, Button, ErrorMessage } from '../../../_shared';
import { useForm } from '../../../_hooks';
import { IChangePassword } from '../../../auth/_models';
import { ApiError } from '../../../_http';
import { translations } from '../../../_translations';
import { FormValidationErrors } from '../../../_hooks/useForm';
import { formValidator } from '../../../_utils/formValidation';
import { authActions } from '../../../_store/actions';
import { authSelectors } from '../../../_store/selectors';

interface Props {
  closeModal: () => void;
}

const initialForm: IChangePassword = {
  newPassword: '',
  oldPassword: '',
};

function validateForm(values: IChangePassword): FormValidationErrors<IChangePassword> {
  // No validation on the oldPassword because this is normally aligned with the validation rules
  return {
    newPassword: formValidator.password(values.newPassword).error,
  };
}

function errorAsString(error?: ApiError): string {
  if (error?.error === 'INVALID_OLD_PASSWORD') return translations.getLabel(`AUTH.ERRORS.INVALID_OLD_PASSWORD`);
  return null;
}

const ChangePasswordModal: FC<Props> = ({ closeModal }) => {
  const dispatch = useDispatch();
  const error = useSelector(authSelectors.errorChangePassword);
  const errorMessage = errorAsString(error);
  const form = useForm<IChangePassword>({
    error,
    initialForm,
    submitForm: values => dispatch(new authActions.ChangePassword({ values })),
    validateForm,
  });

  return (
    <Modal className="change-password-modal" onClose={closeModal} open>
      <form onSubmit={form.submit}>
        <ErrorMessage isGlobal isVisible={!!errorMessage}>
          {errorMessage}
        </ErrorMessage>
        <Modal.Content>
          <InputField
            errorMessage={form.validationErrors.oldPassword}
            label={translations.getLabel('AUTH.CHANGE_PASSWORD.OLD_PASSWORD')}
            name="oldPassword"
            onChange={form.setAttribute}
            type="password"
            value={form.values.oldPassword}
          />
          <InputField
            errorMessage={form.validationErrors.newPassword}
            label={translations.getLabel('AUTH.CHANGE_PASSWORD.NEW_PASSWORD')}
            name="newPassword"
            onChange={form.setAttribute}
            type="password"
            value={form.values.newPassword}
          />
        </Modal.Content>
        <div className="actions">
          <Button loading={false} primary type="submit">
            {translations.getLabel('AUTH.CHANGE_PASSWORD.TITLE')}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ChangePasswordModal;
