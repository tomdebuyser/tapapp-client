import React from 'react';
import { Container } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, InputField } from '../_shared';
import { useForm } from '../_hooks';
import { translations } from '../_translations';
import { authActions } from '../_store/actions';
import ErrorMessage from '../_shared/errorMessage/ErrorMessage';
import { authSelectors } from '../_store/selectors';
import './auth.scss';
import { FormValidationErrors } from '../_hooks/useForm';
import { FormValidator } from '../_utils/form-validation';
import { IRequestPasswordResetForm } from './_models/RequestPasswordReset';

const initialForm: IRequestPasswordResetForm = {
  email: '',
};

function validateForm(form: IRequestPasswordResetForm): FormValidationErrors<IRequestPasswordResetForm> {
  return {
    email: FormValidator.isEmail(form.email),
  };
}

const RequestPasswordReset = () => {
  const dispatch = useDispatch();
  const isSubmitting = useSelector(authSelectors.isRequestPasswordResetLoading);
  const error = useSelector(authSelectors.errorRequestPasswordReset);
  const { Form } = useForm<IRequestPasswordResetForm>({
    initialForm,
    submitForm: form => dispatch(new authActions.RequestPasswordReset(form)),
    validateForm,
  });

  return (
    <Container as="main" className="request-password-reset">
      <h1>{translations.getLabel('AUTH.REQUEST_PASSWORD_RESET.TITLE')}</h1>
      <p>{translations.getLabel('AUTH.REQUEST_PASSWORD_RESET.DESCRIPTION')}</p>
      <form onSubmit={Form.submit}>
        <InputField
          autoComplete="email"
          errorMessage={Form.validationErrors.email}
          label={translations.getLabel('AUTH.REQUEST_PASSWORD_RESET.EMAIL')}
          name="email"
          onChange={Form.setAttribute}
          type="email"
          value={Form.values.email}
        />
        <ErrorMessage isVisible={!!error}>{error?.message}</ErrorMessage>
        <div>
          <Button loading={isSubmitting} primary type="submit">
            {translations.getLabel('AUTH.REQUEST_PASSWORD_RESET.RESET')}
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default RequestPasswordReset;
