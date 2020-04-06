import React from 'react';
import { Button } from 'semantic-ui-react';
import { translations } from '../../_translations';

const ChangePassword = () => {
  return (
    <section className="section-change-password">
      <h2>{translations.getLabel('PROFILE.SETTINGS.CHANGE_PASSWORD')}</h2>
      <span>{translations.getLabel('PROFILE.SETTINGS.CHANGE_PASSWORD_INFORMATION')}</span>
      <Button loading={false} onClick={() => console.log('tst')}>
        {translations.getLabel('PROFILE.SETTINGS.CHANGE_PASSWORD')}
      </Button>
    </section>
  );
};

export default ChangePassword;
