import React, { useEffect, FormEvent, FC } from 'react';
import { Container } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, InputField } from '../_shared';
import { useForm, useToggle } from '../_hooks';
import { translations } from '../_translations';
import { authActions } from '../_store/actions';
import ErrorMessage from '../_shared/errorMessage/ErrorMessage';
import { authSelectors } from '../_store/selectors';
import { validatePassword } from '../_utils/validators';
import { IChangePasswordForm } from './_models/ChoosePassword';
import './auth.scss';

interface Props {
  isPasswordReset?: boolean;
}

const initialForm: IChangePasswordForm = {
  newPassword: '',
  resetToken: '',
};

const ChoosePassword: FC<Props> = ({ isPasswordReset }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(authSelectors.isChoosePasswordLoading);
  const error = useSelector(authSelectors.errorChoosePassword);
  const [validationError, setValidationError] = useToggle(false);
  const { token } = useParams();
  const { form, setFormAttribute } = useForm(initialForm);

  useEffect(() => {
    setFormAttribute(token, 'resetToken');
  }, [setFormAttribute, token]);

  const submitNewPassword = (event: FormEvent) => {
    event.preventDefault();
    if (validatePassword(form.newPassword)) {
      setValidationError(false);
      dispatch(new authActions.ChoosePassword(form));
    } else {
      setValidationError(true);
    }
  };

  return (
    <Container as="main" className="choose-password">
      <h1>{translations.getLabel(isPasswordReset ? 'AUTH.RESET_PASSWORD.TITLE' : 'AUTH.REGISTER.TITLE')}</h1>
      <form onSubmit={submitNewPassword}>
        <InputField
          type="password"
          autoComplete="new-password"
          name="newPassword"
          label={translations.getLabel('AUTH.REGISTER.CHOOSE_PASSWORD')}
          value={form.newPassword}
          onChange={setFormAttribute}
          error={validationError}
          errorMessage={translations.getLabel('AUTH.REGISTER.ERROR.UNSAFE_PASSWORD')}
        />
        <p className="guidelines">{translations.getLabel('AUTH.REGISTER.PASSWORD_GUIDELINES')}</p>
        <ErrorMessage isVisible={!!error}>{translations.getLabel('AUTH.REGISTER.ERROR.GENERAL')}</ErrorMessage>
        <div>
          <Button primary type="submit" loading={isLoading}>
            {translations.getLabel(isPasswordReset ? 'AUTH.RESET_PASSWORD.RESET' : 'AUTH.REGISTER.REGISTER')}
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default ChoosePassword;
