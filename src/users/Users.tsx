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
import { TableColumn } from '../_shared/table/Table';
import { IUser } from './_models/User';
import './users.scss';

const columns: TableColumn[] = [
  { name: 'email', label: 'USERS.EMAIL', sortable: true },
  { name: 'firstName', label: 'USERS.FIRST_NAME', sortable: true },
  { name: 'lastName', label: 'USERS.LAST_NAME', sortable: true },
  { name: 'createdAt', label: 'USERS.CREATED_AT', sortable: true },
  { name: 'updatedAt', label: 'USERS.UPDATED_AT', sortable: true },
  { name: 'state', label: 'USERS.STATE', sortable: true },
];

function renderRow(user: IUser): JSX.Element {
  return (
    <Table.Row key={user.email}>
      <Table.Cell className="email-cell">{user.email}</Table.Cell>
      <Table.Cell>{user.firstName}</Table.Cell>
      <Table.Cell>{user.lastName}</Table.Cell>
      <Table.Cell>{formatDate(dateFromISOString(user.createdAt))}</Table.Cell>
      <Table.Cell>{formatDate(dateFromISOString(user.updatedAt))}</Table.Cell>
      <Table.Cell>{user.state}</Table.Cell>
    </Table.Row>
  );
}

const Users: FC = () => {
  const users = useSelector(usersSelectors.users);
  const isLoading = useSelector(usersSelectors.isGetUsersLoading);
  const dispatch = useDispatch();

  const getUsers = useCallback((query?: HttpMetadataQuery) => {
    dispatch(new usersActions.GetUsers(query));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const { sortFunctions } = useSort(getUsers);
  useEffect(() => {
    getUsers();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
        columns={columns}
        renderRow={renderRow}
        data={users}
        isLoading={isLoading}
        emptyLabel={translations.getLabel('USERS.EMPTY')}
        sortFunctions={sortFunctions}
      />
    </Container>
  );
};

export default Users;
