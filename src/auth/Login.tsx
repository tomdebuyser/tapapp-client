import React, { FormEvent } from 'react';
import { Container } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { translations } from '../_translations';
import { InputField, Button } from '../_shared';
import { useForm, useToggle } from '../_hooks';
import { authSelectors } from '../_store/selectors';
import { authActions } from '../_store/actions';
import ErrorMessage from '../_shared/errorMessage/ErrorMessage';
import { ApiError, HttpStatus } from '../_http';
import { ILoginForm } from './_models/Login';
import './auth.scss';

const initialForm: ILoginForm = {
  username: '',
  password: '',
};

const getErrorMessage = (error: ApiError) => {
  if (!error) return '';
  if (error?.statusCode === HttpStatus.Unauthorized) return translations.getLabel('AUTH.LOGIN.ERROR_UNAUTHORIZED');
  return translations.getLabel('AUTH.LOGIN.ERROR_GENERAL');
};

const Login = () => {
  const dispatch = useDispatch();
  const [validationError, setValidationError] = useToggle(false);
  const isLoading = useSelector(authSelectors.isLoginLoading);
  const error = useSelector(authSelectors.errorLogin);
  const { form, setFormAttribute } = useForm(initialForm);

  const login = (event: FormEvent) => {
    event.preventDefault();
    if (form.username && form.password) {
      setValidationError(false);
      dispatch(new authActions.Login(form));
    } else {
      setValidationError(true);
    }
  };

  return (
    <Container as="main" className="login">
      <h1>{translations.getLabel('AUTH.LOGIN.TITLE')}</h1>
      <form onSubmit={login}>
        <InputField
          label={translations.getLabel('AUTH.LOGIN.USERNAME')}
          type="string"
          name="username"
          autoComplete="username"
          value={form.username}
          onChange={setFormAttribute}
          error={validationError && !form.username}
          errorMessage={translations.getLabel('AUTH.LOGIN.ERROR_EMPTY_USERNAME')}
        />
        <InputField
          label={translations.getLabel('AUTH.LOGIN.PASSWORD')}
          type="password"
          name="password"
          value={form.password}
          onChange={setFormAttribute}
          autoComplete="current-password"
          error={validationError && !form.password}
          errorMessage={translations.getLabel('AUTH.LOGIN.ERROR_EMPTY_PASSWORD')}
        />
        <ErrorMessage isVisible={!!error}>{getErrorMessage(error)}</ErrorMessage>
        <Link to="/auth/request-password-reset">{translations.getLabel('AUTH.LOGIN.FORGOT_PASSWORD')}</Link>
        <div>
          <Button primary type="submit" loading={isLoading}>
            {translations.getLabel('AUTH.LOGIN.LOGIN')}
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default Login;
