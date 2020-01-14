import React, { useEffect, FormEvent } from 'react';
import { Container } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, InputField } from '../_shared';
import { useForm } from '../_hooks';
import { translations } from '../_translations';
import { authActions } from '../_store/actions';
import ErrorMessage from '../_shared/errorMessage/ErrorMessage';
import { authSelectors } from '../_store/selectors';
import { IResetPasswordForm } from './_models/ResetPassword';
import './resetPassword.scss';

const initialForm: IResetPasswordForm = {
  newPassword: '',
  resetToken: '',
};

const ResetPassword = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(authSelectors.isResetPasswordLoading);
  const error = useSelector(authSelectors.errorResetPassword);
  const { token } = useParams();
  const { form, setFormAttribute } = useForm(initialForm);

  useEffect(() => {
    setFormAttribute(token, 'resetToken');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const submitNewPassword = (event: FormEvent) => {
    event.preventDefault();
    dispatch(new authActions.ResetPassword(form));
  };

  return (
    <Container as="main" className="reset-password">
      <h1>{translations.getLabel('REGISTER.TITLE')}</h1>
      <form onSubmit={submitNewPassword}>
        <InputField
          type="password"
          autoComplete="new-password"
          name="newPassword"
          label={translations.getLabel('REGISTER.CHOOSE_PASSWORD')}
          value={form.newPassword}
          onChange={setFormAttribute}
        />
        <ErrorMessage isVisible={!!error}>{error?.message}</ErrorMessage>
        <div>
          <Button primary type="submit" loading={isLoading}>
            {translations.getLabel('REGISTER.REGISTER')}
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default ResetPassword;
