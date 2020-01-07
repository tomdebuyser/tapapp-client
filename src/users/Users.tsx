import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { translations } from '../_translations';
import { Table } from '../_shared';
import { usersSelectors } from '../_store/selectors';
import { usersActions } from '../_store/actions';
import { formatDate, dateFromISOString } from '../_utils/timeHelpers';
import { IUser } from './_models/User';
import './users.scss';

const renderHeader = () => (
  <Table.Row>
    <Table.HeaderCell>{translations.getLabel('USERS.EMAIL')}</Table.HeaderCell>
    <Table.HeaderCell>{translations.getLabel('USERS.CREATED_AT')}</Table.HeaderCell>
    <Table.HeaderCell>{translations.getLabel('USERS.UPDATED_AT')}</Table.HeaderCell>
    <Table.HeaderCell>{translations.getLabel('USERS.STATE')}</Table.HeaderCell>
  </Table.Row>
);

const renderBody = users => {
  return users.map((user: IUser) => (
    <Table.Row key={user.email}>
      <Table.Cell>{user.email}</Table.Cell>
      <Table.Cell>{formatDate(dateFromISOString(user.createdAt))}</Table.Cell>
      <Table.Cell>{formatDate(dateFromISOString(user.updatedAt))}</Table.Cell>
      <Table.Cell>{user.state}</Table.Cell>
    </Table.Row>
  ));
};

const Users: FC = () => {
  const users = useSelector(usersSelectors.users);
  const isLoading = useSelector(usersSelectors.isLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(new usersActions.GetUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="users">
      <h1>{translations.getLabel('USERS.TITLE')}</h1>
      <Table
        renderHeader={renderHeader}
        renderBody={renderBody}
        data={users}
        isLoading={isLoading}
        columnCount={4}
        emptyLabel={translations.getLabel('USERS.EMPTY')}
      />
    </main>
  );
};

export default Users;
