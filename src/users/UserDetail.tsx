import React from 'react';
import { Container } from 'semantic-ui-react';
import { Link, useLocation, Redirect } from 'react-router-dom';
import { Icon, InputField } from '../_shared';
import { translations } from '../_translations';
import { formatDate, dateFromISOString } from '../_utils/timeHelpers';
import { IUser } from './_models/User';
import './userDetail.scss';

const renderDate = (date: string, label: string) => (
  <div className="info-field">
    <span className="description">{translations.getLabel(label)}</span>
    <p>{formatDate(dateFromISOString(date))}</p>
  </div>
);

const UserDetail = () => {
  const { state } = useLocation();

  if (!state) return <Redirect to="/users" />;

  const { user }: { user: IUser } = state;

  return (
    <Container as="main" className="user-detail">
      <Link to="/users">
        <Icon name="SvgChevronLeft" size={2} />
        <span>{translations.getLabel('USERS.DETAIL.BACK')}</span>
      </Link>
      <h1>{user.email}</h1>
      <span className="user-id">{`${translations.getLabel('USERS.DETAIL.ID')}: ${user.id}`}</span>
      <form>
        <InputField disabled label={translations.getLabel('USERS.DETAIL.EMAIL')} value={user.email} />
        <div role="group">
          <InputField disabled label={translations.getLabel('USERS.DETAIL.FIRST_NAME')} value={user.firstName} />
          <InputField disabled label={translations.getLabel('USERS.DETAIL.LAST_NAME')} value={user.lastName} />
        </div>
        <InputField disabled label={translations.getLabel('USERS.DETAIL.STATE')} value={user.state} />
        <div className="info-wrapper">
          {renderDate(user.createdAt, 'USERS.DETAIL.CREATED_AT')}
          {renderDate(user.updatedAt, 'USERS.DETAIL.UPDATED_AT')}
        </div>
      </form>
    </Container>
  );
};

export default UserDetail;
