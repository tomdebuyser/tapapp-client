import React, { FC } from 'react';
import { Container } from 'semantic-ui-react';
import { Config } from '../config';
import { translations } from '../_translations';

const Profile: FC = () => {
  return (
    <Container as="main" className="left-container">
      <h1>
        {translations.getLabel('PROFILE.TITLE', {
          brandName: Config.brandName,
        })}
      </h1>
    </Container>
  );
};

export default Profile;
