import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Table, { TableColumn } from '../../_shared/table/Table';
import { formatDate, dateFromISOString } from '../../_utils/timeHelpers';
import { FillMetadataQueryFunction, HttpSortDirection } from '../../_http/HttpMetadata';
import { translations } from '../../_translations';
import { useTableSort, useInfiniteScroll } from '../../_hooks';
import { usersSelectors } from '../../_store/selectors';
import { IUser } from '../_models/User';
import { labelForUserState } from '../_utils';

interface Props {
  data?: IUser[];
  isLoading: boolean;
  setQuery: FillMetadataQueryFunction;
}

const columns: TableColumn[] = [
  { name: 'email', label: 'USERS.EMAIL', sortable: true, className: 'email-column' },
  { name: 'firstName', label: 'USERS.FIRST_NAME', sortable: true },
  { name: 'lastName', label: 'USERS.LAST_NAME', sortable: true },
  { name: 'createdAt', label: 'USERS.OVERVIEW.CREATED_AT', sortable: true },
  { name: 'updatedAt', label: 'USERS.OVERVIEW.UPDATED_AT', sortable: true },
  { name: 'state', label: 'USERS.STATE.TITLE', sortable: true },
];

const UsersTable: FC<Props> = ({ data, isLoading, setQuery }) => {
  const metadata = useSelector(usersSelectors.metadata);

  const { sortFunctions } = useTableSort((column: string, direction: HttpSortDirection) =>
    setQuery({ sortBy: column, sortDirection: direction, skip: 0 }),
  );
  useInfiniteScroll((skip: number) => setQuery({ skip }), metadata, isLoading);

  function renderRow(user: IUser): JSX.Element {
    return (
      <Table.Row key={user.email}>
        <Table.Cell>
          <Link to={{ pathname: `/users/${user.id}` }}>{user.email}</Link>
        </Table.Cell>
        <Table.Cell>{user.firstName}</Table.Cell>
        <Table.Cell>{user.lastName}</Table.Cell>
        <Table.Cell>{formatDate(dateFromISOString(user.createdAt))}</Table.Cell>
        <Table.Cell>{formatDate(dateFromISOString(user.updatedAt))}</Table.Cell>
        <Table.Cell>{labelForUserState(user.state)}</Table.Cell>
      </Table.Row>
    );
  }

  return (
    <Table
      columns={columns}
      data={data}
      emptyLabel={translations.getLabel('USERS.OVERVIEW.EMPTY')}
      isLoading={isLoading}
      renderRow={renderRow}
      sortFunctions={sortFunctions}
    />
  );
};

export default UsersTable;
