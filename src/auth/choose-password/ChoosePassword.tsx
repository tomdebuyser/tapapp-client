import React, { useEffect, FC } from 'react';
import { Container } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, InputField } from '../../_shared';
import { useForm } from '../../_hooks';
import { translations } from '../../_translations';
import { authActions } from '../../_store/actions';
import ErrorMessage from '../../_shared/errorMessage/ErrorMessage';
import { authSelectors } from '../../_store/selectors';
import { FormValidator } from '../../_utils/form-validation';
import { FormValidationErrors } from '../../_hooks/useForm';
import { IChangePasswordForm } from '../_models/ChoosePassword';
import { ApiError } from '../../_http';

interface Props {
  isPasswordReset?: boolean;
}

const initialForm: IChangePasswordForm = {
  newPassword: '',
  resetToken: '',
};

function validateForm(form: IChangePasswordForm): FormValidationErrors<IChangePasswordForm> {
  return {
    newPassword: FormValidator.isPassword(form.newPassword),
  };
}

function errorAsString(error?: ApiError): string {
  if (error?.error === 'RESET_TOKEN_INVALID') return translations.getLabel(`AUTH.ERRORS.RESET_TOKEN_INVALID`);
  if (error?.error === 'RESET_TOKEN_EXPIRED') return translations.getLabel(`AUTH.ERRORS.RESET_TOKEN_EXPIRED`);
  return null;
}

const ChoosePassword: FC<Props> = ({ isPasswordReset }) => {
  const dispatch = useDispatch();
  const isSubmitting = useSelector(authSelectors.isChoosePasswordLoading);
  const error = useSelector(authSelectors.errorChoosePassword);
  const { token } = useParams();
  const { Form } = useForm<IChangePasswordForm>({
    initialForm,
    submitForm: form => dispatch(new authActions.ChoosePassword(form)),
    validateForm,
  });

  useEffect(() => {
    Form.setAttribute(token, 'resetToken');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const errorMessage = errorAsString(error);

  return (
    <Container as="main" className="choose-password">
      <h1>{translations.getLabel(isPasswordReset ? 'AUTH.RESET_PASSWORD.TITLE' : 'AUTH.REGISTER.TITLE')}</h1>
      <form onSubmit={Form.submit}>
        <InputField
          autoComplete="new-password"
          errorMessage={Form.validationErrors.newPassword}
          label={translations.getLabel('AUTH.REGISTER.CHOOSE_PASSWORD')}
          name="newPassword"
          onChange={Form.setAttribute}
          type="password"
          value={Form.values.newPassword}
        />
        <p className="guidelines">{translations.getLabel('AUTH.REGISTER.PASSWORD_GUIDELINES')}</p>
        <ErrorMessage isVisible={!!errorMessage}>{errorMessage}</ErrorMessage>
        <div>
          <Button loading={isSubmitting} primary type="submit">
            {translations.getLabel(isPasswordReset ? 'AUTH.RESET_PASSWORD.RESET' : 'AUTH.REGISTER.REGISTER')}
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default ChoosePassword;
