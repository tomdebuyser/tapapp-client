import React, { FC } from 'react';
import Table, { TableColumn } from '../_shared/table/Table';
import { formatDate, dateFromISOString } from '../_utils/timeHelpers';
import { FillMetadataQueryFunction, HttpSortDirection } from '../_http/HttpMetadata';
import { translations } from '../_translations';
import { useTableSort } from '../_hooks';
import { IUser } from './_models/User';

interface Props {
  data?: IUser[];
  isLoading: boolean;
  setQuery: FillMetadataQueryFunction;
}

const columns: TableColumn[] = [
  { name: 'email', label: 'USERS.EMAIL', sortable: true },
  { name: 'firstName', label: 'USERS.FIRST_NAME', sortable: true },
  { name: 'lastName', label: 'USERS.LAST_NAME', sortable: true },
  { name: 'createdAt', label: 'USERS.CREATED_AT', sortable: true },
  { name: 'updatedAt', label: 'USERS.UPDATED_AT', sortable: true },
  { name: 'state', label: 'USERS.STATE', sortable: true },
];

const UsersTable: FC<Props> = ({ data, isLoading, setQuery }) => {
  const { sortFunctions } = useTableSort((column: string, direction: HttpSortDirection) =>
    setQuery({ sortBy: column, sortDirection: direction }),
  );

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

  return (
    <Table
      columns={columns}
      renderRow={renderRow}
      data={data}
      isLoading={isLoading}
      emptyLabel={translations.getLabel('USERS.EMPTY')}
      sortFunctions={sortFunctions}
    />
  );
};

export default UsersTable;
