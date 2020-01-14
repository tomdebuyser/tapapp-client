import React, { FormEvent } from 'react';
import { Container } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, InputField } from '../_shared';
import { useForm } from '../_hooks';
import { translations } from '../_translations';
import { authActions } from '../_store/actions';
import ErrorMessage from '../_shared/errorMessage/ErrorMessage';
import { authSelectors } from '../_store/selectors';
import { IRequestPasswordResetForm } from './_models/RequestPasswordReset';
import './auth.scss';

const initialForm: IRequestPasswordResetForm = {
  email: '',
};

const RequestPasswordReset = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(authSelectors.isRequestPasswordResetLoading);
  const error = useSelector(authSelectors.errorRequestPasswordReset);
  const { form, setFormAttribute } = useForm(initialForm);

  const submitNewPassword = (event: FormEvent) => {
    event.preventDefault();
    dispatch(new authActions.RequestPasswordReset(form));
  };

  return (
    <Container as="main" className="request-password-reset">
      <h1>{translations.getLabel('AUTH.REQUEST_PASSWORD_RESET.TITLE')}</h1>
      <form onSubmit={submitNewPassword}>
        <InputField
          type="string"
          autoComplete="email"
          name="email"
          label={translations.getLabel('AUTH.REQUEST_PASSWORD_RESET.EMAIL')}
          value={form.email}
          onChange={setFormAttribute}
        />
        <ErrorMessage isVisible={!!error}>{error?.message}</ErrorMessage>
        <div>
          <Button primary type="submit" loading={isLoading}>
            {translations.getLabel('AUTH.REQUEST_PASSWORD_RESET.RESET')}
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default RequestPasswordReset;
