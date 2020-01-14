import React from 'react';
import { Container } from 'semantic-ui-react';
import { translations } from '../_translations';
import { InputField, Button } from '../_shared';

import './login.scss';

const Login = () => {
  return (
    <Container as="main" className="login">
      <h1>{translations.getLabel('LOGIN.TITLE')}</h1>
      <form>
        <InputField type="string" name="newPassword" />
        <div>
          <Button primary type="submit">
            {translations.getLabel('LOGIN.LOGIN')}
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default Login;
