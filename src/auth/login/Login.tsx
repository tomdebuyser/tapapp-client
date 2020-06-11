import React from 'react';
import { Container } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { translations } from '../../_translations';
import { InputField, Button, ErrorMessage } from '../../_shared';
import { useForm } from '../../_hooks';
import { authSelectors } from '../../_store/selectors';
import { authActions } from '../../_store/actions';
import { FormValidationErrors } from '../../_hooks/useForm';
import { ApiError, HttpStatus } from '../../_http';
import { formValidator } from '../../_utils/formValidation';
import { ILoginForm } from '../_models';
import './login.scss';

const initialForm: ILoginForm = {
  password: '',
  username: '',
};

function validateForm(values: ILoginForm): FormValidationErrors<ILoginForm> {
  return {
    password: formValidator.required(values.password),
    username: formValidator.email(values.username),
  };
}

function errorAsString(error?: ApiError): string {
  if (error?.statusCode === HttpStatus.Unauthorized) return translations.getLabel(`AUTH.ERRORS.UNAUTHORIZED`);
  if (error?.error === 'USER_STATE_NOT_ALLOWED') return translations.getLabel(`AUTH.ERRORS.USER_STATE_NOT_ALLOWED`);
  return null;
}

const Login = () => {
  const dispatch = useDispatch();
  const { state } = useLocation<{ pathname: string }>();
  const isSubmitting = useSelector(authSelectors.isLoginLoading);
  const error = useSelector(authSelectors.errorLogin);
  console.log(state?.pathname);
  const form = useForm<ILoginForm>({
    error,
    initialForm,
    submitForm: values => dispatch(new authActions.Login({ pathname: state?.pathname, values })),
    validateForm,
  });
  const errorMessage = errorAsString(error);

  return (
    <Container as="main" className="login">
      <form onSubmit={form.submit}>
        <ErrorMessage isGlobal isVisible={!!errorMessage}>
          {errorMessage}
        </ErrorMessage>
        <div className="input-fields">
          <InputField
            autoComplete="username"
            name="username"
            onChange={form.setAttribute}
            placeholder={translations.getLabel('AUTH.LOGIN.USERNAME')}
            type="email"
            validation={form.validationErrors.username}
            value={form.values.username}
          />
          <InputField
            autoComplete="current-password"
            name="password"
            onChange={form.setAttribute}
            placeholder={translations.getLabel('AUTH.LOGIN.PASSWORD')}
            type="password"
            validation={form.validationErrors.password}
            value={form.values.password}
          />
        </div>
        <div className="actions">
          <Button loading={isSubmitting} primary type="submit">
            {translations.getLabel('AUTH.LOGIN.BUTTON')}
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default Login;
