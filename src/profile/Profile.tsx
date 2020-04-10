import React, { FC } from 'react';
import { Container } from 'semantic-ui-react';
import { config } from '../config';
import { translations } from '../_translations';
import ChangePassword from '../auth/change-password/ChangePassword';

const Profile: FC = () => {
  return (
    <Container as="main" className="left-container">
      <h1>
        {translations.getLabel('SHARED.PROFILE.TITLE', {
          brandName: config.brandName(),
        })}
      </h1>
      <ChangePassword />
    </Container>
  );
};

export default Profile;
