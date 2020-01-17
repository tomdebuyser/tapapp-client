import React from 'react';
import { Container } from 'semantic-ui-react';
import { Link, useLocation, Redirect } from 'react-router-dom';
import { Icon, InputField, Field } from '../_shared';
import { translations } from '../_translations';
import { formatDate, dateFromISOString } from '../_utils/timeHelpers';
import { IUser } from './_models/User';
import './userDetail.scss';
import RolesDropdown from '../roles/rolesDropdown/RolesDropdown';

const renderField = (value: string, label: string) => (
  <div className="info-field">
    <label>{translations.getLabel(label)}</label>
    <p>{value}</p>
  </div>
);

const renderDate = (date: string, label: string) => renderField(formatDate(dateFromISOString(date)), label);

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
      <form>
        <Field value={user.email} label="USERS.EMAIL" />
        <div role="group">
          <InputField label={translations.getLabel('USERS.FIRST_NAME')} value={user.firstName} onChange={() => {}} />
          <InputField label={translations.getLabel('USERS.LAST_NAME')} value={user.lastName} onChange={() => {}} />
        </div>
        <RolesDropdown
          label={translations.getLabel('USERS.ROLE')}
          name="role"
          onChange={() => {}}
          value={user.roles.map(role => role.id)}
        />
        <Field value={user.state} label="USERS.STATE" />
        <div className="info-wrapper">
          <Field value={user.createdAt} label="USERS.CREATED_AT" isDate />
          <Field value={user.updatedAt} label="USERS.UPDATED_AT" isDate />
        </div>
      </form>
    </Container>
  );
};

export default UserDetail;
