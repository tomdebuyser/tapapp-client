import React, { FormEvent } from 'react';
import { Container } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { translations } from '../_translations';
import { InputField, Button } from '../_shared';
import { useForm } from '../_hooks';
import { authSelectors } from '../_store/selectors';
import { authActions } from '../_store/actions';
import ErrorMessage from '../_shared/errorMessage/ErrorMessage';
import { ILoginForm } from './_models/Login';
import './auth.scss';

const initialForm: ILoginForm = {
  username: '',
  password: '',
};

const Login = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(authSelectors.isLoginLoading);
  const error = useSelector(authSelectors.errorLogin);
  const { form, setFormAttribute } = useForm(initialForm);

  const login = (event: FormEvent) => {
    event.preventDefault();
    dispatch(new authActions.Login(form));
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
        />
        <InputField
          label={translations.getLabel('AUTH.LOGIN.PASSWORD')}
          type="password"
          name="password"
          value={form.password}
          onChange={setFormAttribute}
          autoComplete="current-password"
        />
        <ErrorMessage isVisible={!!error}>{error?.message}</ErrorMessage>
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
