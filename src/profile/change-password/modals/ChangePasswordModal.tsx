import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, InputField, Button, ErrorMessage } from '../../../_shared';
import { ApiError } from '../../../_http';
import { useForm } from '../../../_hooks';
import { FormValidationErrors } from '../../../_hooks/useForm';
import { IChangePasswordForm } from '../../../auth/_models';
import { authActions } from '../../../_store/actions';
import { authSelectors } from '../../../_store/selectors';
import { formValidator } from '../../../_utils/formValidation';
import { translations } from '../../../_translations';

interface Props {
  closeModal: () => void;
}

const initialForm: IChangePasswordForm = {
  newPassword: '',
  oldPassword: '',
  repeatNewPassword: '',
};

function validateForm(values: IChangePasswordForm): FormValidationErrors<IChangePasswordForm> {
  // No validation on the oldPassword because this is normally aligned with the validation rules
  return {
    newPassword: formValidator.password(values.newPassword).error,
    repeatNewPassword: formValidator.matchingPasswords(values.newPassword, values.repeatNewPassword).error,
  };
}

function errorAsString(error?: ApiError): string {
  if (error?.error === 'INVALID_OLD_PASSWORD') return translations.getLabel(`AUTH.ERRORS.INVALID_OLD_PASSWORD`);
  return null;
}

const ChangePasswordModal: FC<Props> = ({ closeModal }) => {
  const dispatch = useDispatch();
  const isSubmitting = useSelector(authSelectors.isChangePasswordLoading);
  const error = useSelector(authSelectors.errorChangePassword);
  const errorMessage = errorAsString(error);
  const form = useForm<IChangePasswordForm>({
    error,
    initialForm,
    submitForm: values => dispatch(new authActions.ChangePassword({ values })),
    validateForm,
  });

  return (
    <Modal className="change-password-modal" onClose={closeModal} open>
      <form onSubmit={form.submit}>
        <Modal.Header>{translations.getLabel('AUTH.CHANGE_PASSWORD.TITLE')}</Modal.Header>
        <Modal.Content>
          <ErrorMessage isGlobal isVisible={!!errorMessage}>
            {errorMessage}
          </ErrorMessage>
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
          <InputField
            errorMessage={form.validationErrors.repeatNewPassword}
            label={translations.getLabel('AUTH.CHANGE_PASSWORD.REPEAT_NEW_PASSWORD')}
            name="repeatNewPassword"
            onChange={form.setAttribute}
            type="password"
            value={form.values.repeatNewPassword}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button loading={isSubmitting} primary type="submit">
            {translations.getLabel('SHARED.BUTTONS.SAVE')}
          </Button>
        </Modal.Actions>
      </form>
    </Modal>
  );
};

export default ChangePasswordModal;
