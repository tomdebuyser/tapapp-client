import React, { FC } from 'react';
import { Container } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, InputField, ErrorMessage } from '../../_shared';
import { useForm } from '../../_hooks';
import { translations } from '../../_translations';
import { authActions } from '../../_store/actions';
import { authSelectors } from '../../_store/selectors';
import { formValidator } from '../../_utils/formValidation';
import { FormValidationErrors } from '../../_hooks/useForm';
import { IChoosePasswordForm } from '../_models';
import { ApiError } from '../../_http';
import './choosePassword.scss';

interface Props {
  isPasswordReset?: boolean;
}

const initialForm: IChoosePasswordForm = {
  newPassword: '',
};

function validateForm(values: IChoosePasswordForm): FormValidationErrors<IChoosePasswordForm> {
  return {
    newPassword: formValidator.password(values.newPassword).error,
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
  const form = useForm<IChoosePasswordForm>({
    error,
    initialForm,
    submitForm: values => dispatch(new authActions.ChoosePassword({ token, values })),
    validateForm,
  });
  const errorMessage = errorAsString(error);

  return (
    <Container as="main" className="choose-password">
      <h1>{translations.getLabel(isPasswordReset ? 'AUTH.RESET_PASSWORD.TITLE' : 'AUTH.REGISTER.TITLE')}</h1>
      <p>{translations.getLabel('AUTH.PASSWORD_GUIDELINES')}</p>
      <form onSubmit={form.submit}>
        <ErrorMessage isGlobal isVisible={!!errorMessage}>
          {errorMessage}
        </ErrorMessage>
        <InputField
          autoComplete="new-password"
          errorMessage={form.validationErrors.newPassword}
          name="newPassword"
          onChange={form.setAttribute}
          type="password"
          value={form.values.newPassword}
        />
        <div className="actions">
          <Button loading={isSubmitting} primary type="submit">
            {translations.getLabel(isPasswordReset ? 'AUTH.RESET_PASSWORD.RESET' : 'AUTH.REGISTER.REGISTER')}
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default ChoosePassword;
