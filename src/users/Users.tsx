import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from 'semantic-ui-react';
import { Table, Icon, Button } from '../_shared';
import { translations } from '../_translations';
import { usersSelectors } from '../_store/selectors';
import { usersActions } from '../_store/actions';
import { formatDate, dateFromISOString } from '../_utils/timeHelpers';
import InputField from '../_shared/inputField/InputField';
import useDebounce from '../_hooks/useDebounce';
import { IUser } from './_models/User';
import './users.scss';

const renderHeader = () => (
  <Table.Row>
    <Table.HeaderCell className="email-cell">{translations.getLabel('USERS.EMAIL')}</Table.HeaderCell>
    <Table.HeaderCell>{translations.getLabel('USERS.FIRST_NAME')}</Table.HeaderCell>
    <Table.HeaderCell>{translations.getLabel('USERS.LAST_NAME')}</Table.HeaderCell>
    <Table.HeaderCell>{translations.getLabel('USERS.CREATED_AT')}</Table.HeaderCell>
    <Table.HeaderCell>{translations.getLabel('USERS.UPDATED_AT')}</Table.HeaderCell>
    <Table.HeaderCell>{translations.getLabel('USERS.STATE')}</Table.HeaderCell>
  </Table.Row>
);

const renderBody = users => {
  return users.map((user: IUser) => (
    <Table.Row key={user.email}>
      <Table.Cell className="email-cell">{user.email}</Table.Cell>
      <Table.Cell>{user.firstName}</Table.Cell>
      <Table.Cell>{user.lastName}</Table.Cell>
      <Table.Cell>{formatDate(dateFromISOString(user.createdAt))}</Table.Cell>
      <Table.Cell>{formatDate(dateFromISOString(user.updatedAt))}</Table.Cell>
      <Table.Cell>{user.state}</Table.Cell>
    </Table.Row>
  ));
};

const Users: FC = () => {
  const [search, setSearch] = useState('');
  const users = useSelector(usersSelectors.users);
  const isLoading = useSelector(usersSelectors.isGetUsersLoading);

  const dispatch = useDispatch();
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    dispatch(new usersActions.GetUsers({ search: debouncedSearch }));
  }, [dispatch, debouncedSearch]);

  return (
    <Container as="main" className="users">
      <h1>{translations.getLabel('USERS.TITLE')}</h1>
      <div className="header">
        <InputField
          className="search-field"
          icon="search"
          value={search}
          onChange={setSearch}
          placeholder={translations.getLabel('SEARCH_PLACEHOLDER')}
        />
        <Button isTextLink href="/users/create" primary>
          <Icon name="SvgAdd" size={1.6} />
          {translations.getLabel('USERS.CREATE_USER')}
        </Button>
      </div>
      <Table
        renderHeader={renderHeader}
        renderBody={renderBody}
        data={users}
        isLoading={isLoading}
        columnCount={6}
        emptyLabel={translations.getLabel('USERS.EMPTY')}
      />
    </Container>
  );
};

export default Users;
