import React, { FC } from 'react';
import { Container } from 'semantic-ui-react';
import { config } from '../config';
import ChangePassword from './change-password/ChangePassword';

const Profile: FC = () => {
  return (
    <Container as="main" className="left-container">
      <p>Welcome to {config.brandName()} admin portal!</p>
      <ChangePassword />
    </Container>
  );
};

export default Profile;
