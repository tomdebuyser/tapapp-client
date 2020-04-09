import React, { FC } from 'react';
import { Container } from 'semantic-ui-react';
import { config } from '../config';
import { translations } from '../_translations';
import ChangePassword from './change-password/ChangePassword';

const Profile: FC = () => {
  return (
    <Container as="main" className="left-container">
      <p>
        {translations.getLabel('SHARED.PROFILE.TITLE', {
          brandName: config.brandName(),
        })}
      </p>
      <ChangePassword />
    </Container>
  );
};

export default Profile;
