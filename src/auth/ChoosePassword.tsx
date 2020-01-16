import React, { useEffect, FormEvent } from 'react';
import { Container } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, InputField } from '../_shared';
import { useForm, useToggle } from '../_hooks';
import { translations } from '../_translations';
import { authActions } from '../_store/actions';
import ErrorMessage from '../_shared/errorMessage/ErrorMessage';
import { authSelectors } from '../_store/selectors';
import { IChangePasswordForm } from './_models/ChoosePassword';
import './auth.scss';

const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;

const initialForm: IChangePasswordForm = {
  newPassword: '',
  resetToken: '',
};

const ChoosePassword = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(authSelectors.isChoosePasswordLoading);
  const error = useSelector(authSelectors.errorChoosePassword);
  const [validationError, setValidationError] = useToggle(false);
  const { token } = useParams();
  const { form, setFormAttribute } = useForm(initialForm);

  useEffect(() => {
    setFormAttribute(token, 'resetToken');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const submitNewPassword = (event: FormEvent) => {
    event.preventDefault();
    if (passwordRegex.test(form.newPassword)) {
      setValidationError(false);
      dispatch(new authActions.ChoosePassword(form));
    } else {
      setValidationError(true);
    }
  };

  return (
    <Container as="main" className="choose-password">
      <h1>{translations.getLabel('AUTH.REGISTER.TITLE')}</h1>
      <form onSubmit={submitNewPassword}>
        <InputField
          type="password"
          autoComplete="new-password"
          name="newPassword"
          label={translations.getLabel('AUTH.REGISTER.CHOOSE_PASSWORD')}
          value={form.newPassword}
          onChange={setFormAttribute}
          error={validationError}
          errorMessage={translations.getLabel('AUTH.REGISTER.ERROR_UNSAFE_PASSWORD')}
        />
        <p className="guidelines">{translations.getLabel('AUTH.REGISTER.PASSWORD_GUIDELINES')}</p>
        <ErrorMessage isVisible={!!error}>{translations.getLabel('AUTH.REGISTER.ERROR_GENERAL')}</ErrorMessage>
        <div>
          <Button primary type="submit" loading={isLoading}>
            {translations.getLabel('AUTH.REGISTER.REGISTER')}
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default ChoosePassword;
