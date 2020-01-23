import React from 'react';
import { Container } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { translations } from '../../_translations';
import { InputField, Button } from '../../_shared';
import { useForm } from '../../_hooks';
import { authSelectors } from '../../_store/selectors';
import { authActions } from '../../_store/actions';
import ErrorMessage from '../../_shared/errorMessage/ErrorMessage';
import { FormValidationErrors } from '../../_hooks/useForm';
import { ApiError, HttpStatus } from '../../_http';
import { FormValidator } from '../../_utils/form-validation';
import { ILoginForm } from '../_models/Login';

const initialForm: ILoginForm = {
  password: '',
  username: '',
};

const getErrorMessage = (error: ApiError): string => {
  if (!error) return '';
  if (error?.statusCode === HttpStatus.Unauthorized) return translations.getLabel('AUTH.LOGIN.ERROR.UNAUTHORIZED');
  return translations.getLabel('ERRORS.GENERAL');
};

function validateForm(form: ILoginForm): FormValidationErrors<ILoginForm> {
  return {
    username: FormValidator.isRequired(form.username),
    password: FormValidator.isRequired(form.password),
  };
}

const Login = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const isSubmitting = useSelector(authSelectors.isLoginLoading);
  const error = useSelector(authSelectors.errorLogin);
  const { Form } = useForm<ILoginForm>({
    initialForm,
    submitForm: form => dispatch(new authActions.Login(form, state?.pathname)),
    validateForm,
  });

  return (
    <Container as="main" className="login">
      <h1>{translations.getLabel('AUTH.LOGIN.TITLE')}</h1>
      <form onSubmit={Form.submit}>
        <InputField
          autoComplete="username"
          errorMessage={Form.validationErrors.username}
          label={translations.getLabel('AUTH.LOGIN.USERNAME')}
          name="username"
          onChange={Form.setAttribute}
          type="text"
          value={Form.values.username}
        />
        <InputField
          autoComplete="current-password"
          errorMessage={Form.validationErrors.password}
          label={translations.getLabel('AUTH.LOGIN.PASSWORD')}
          name="password"
          onChange={Form.setAttribute}
          type="password"
          value={Form.values.password}
        />
        <ErrorMessage isVisible={!!error}>{getErrorMessage(error)}</ErrorMessage>
        <Link to="/auth/request-password-reset">{translations.getLabel('AUTH.LOGIN.FORGOT_PASSWORD')}</Link>
        <div>
          <Button loading={isSubmitting} primary type="submit">
            {translations.getLabel('AUTH.LOGIN.LOGIN')}
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default Login;
