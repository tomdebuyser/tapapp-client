import React, { FC } from 'react';
import { Container } from 'semantic-ui-react';
import { Config } from '../config';
import { translations } from '../_translations';
import ChangePassword from '../auth/change-password/ChangePassword';

const Profile: FC = () => {
  return (
    <Container as="main" className="left-container">
      <h1>
        {translations.getLabel('PROFILE.TITLE', {
          brandName: Config.brandName,
        })}
      </h1>
      <ChangePassword />
    </Container>
  );
};

export default Profile;
