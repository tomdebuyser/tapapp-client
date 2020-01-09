import React, { FC, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from 'semantic-ui-react';
import { Table, Icon, Button, SearchInput } from '../_shared';
import { translations } from '../_translations';
import { usersSelectors } from '../_store/selectors';
import { usersActions } from '../_store/actions';
import { formatDate, dateFromISOString } from '../_utils/timeHelpers';
import { useSort } from '../_hooks';
import { HttpMetadataQuery } from '../_http/HttpMetadata';
import { IUser } from './_models/User';
import './users.scss';

const renderHeader = () => {
  return (
    <Table.Row>
      <Table.HeaderCell className="email-cell" name="email">
        {translations.getLabel('USERS.EMAIL')}
      </Table.HeaderCell>
      <Table.HeaderCell>{translations.getLabel('USERS.FIRST_NAME')}</Table.HeaderCell>
      <Table.HeaderCell>{translations.getLabel('USERS.LAST_NAME')}</Table.HeaderCell>
      <Table.HeaderCell name="createdAt">{translations.getLabel('USERS.CREATED_AT')}</Table.HeaderCell>
      <Table.HeaderCell name="updatedAt">{translations.getLabel('USERS.UPDATED_AT')}</Table.HeaderCell>
      <Table.HeaderCell name="state">{translations.getLabel('USERS.STATE')}</Table.HeaderCell>
    </Table.Row>
  );
};

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
  const users = useSelector(usersSelectors.users);
  const isLoading = useSelector(usersSelectors.isGetUsersLoading);

  const dispatch = useDispatch();
  const { sortBy, sortDirection, sorting } = useSort();

  const getUsers = useCallback(
    (query?: HttpMetadataQuery) => {
      dispatch(new usersActions.GetUsers(query));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch],
  );

  useEffect(() => {
    getUsers({ sortBy, sortDirection });
  }, [getUsers, sortBy, sortDirection]);

  return (
    <Container as="main" className="users">
      <h1>{translations.getLabel('USERS.TITLE')}</h1>
      <div className="header">
        <SearchInput get={getUsers} />
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
        sorting={sorting}
      />
    </Container>
  );
};

export default Users;
