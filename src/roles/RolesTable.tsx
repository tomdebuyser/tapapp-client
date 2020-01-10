import React, { FC } from 'react';
import { FillMetadataQueryFunction, HttpSortDirection } from '../_http/HttpMetadata';
import Table, { TableColumn } from '../_shared/table/Table';
import { formatDate, dateFromISOString } from '../_utils/timeHelpers';
import { useTableSort } from '../_hooks';
import { translations } from '../_translations';
import { IRole } from './_models/Role';

interface Props {
  data?: IRole[];
  isLoading: boolean;
  setQuery: FillMetadataQueryFunction;
}

const columns: TableColumn[] = [
  { name: 'name', label: 'ROLES.NAME', sortable: true },
  { name: 'createdAt', label: 'ROLES.CREATED_AT', sortable: true },
  { name: 'updatedAt', label: 'ROLES.UPDATED_AT', sortable: true },
  { name: 'permissions', label: 'ROLES.PERMISSIONS' },
];

const RolesTable: FC<Props> = ({ data, isLoading, setQuery }) => {
  const { sortFunctions } = useTableSort((column: string, direction: HttpSortDirection) =>
    setQuery({ sortBy: column, sortDirection: direction }),
  );

  function renderRow(role: IRole): JSX.Element {
    return (
      <Table.Row key={role.id}>
        <Table.Cell>{role.name}</Table.Cell>
        <Table.Cell>{formatDate(dateFromISOString(role.createdAt))}</Table.Cell>
        <Table.Cell>{formatDate(dateFromISOString(role.updatedAt))}</Table.Cell>
        <Table.Cell>
          <ul className="permissions">
            {Object.keys(role.permissions).map(permission => {
              const options = Object.keys(role.permissions[permission]).filter(option => role.permissions[permission][option]);
              if (!options?.length) return '';
              return (
                <li key={permission}>
                  <span>{`${permission}: `}</span>
                  {options.join(', ')}
                </li>
              );
            })}
          </ul>
        </Table.Cell>
      </Table.Row>
    );
  }

  return (
    <Table
      columns={columns}
      renderRow={renderRow}
      data={data}
      isLoading={isLoading}
      emptyLabel={translations.getLabel('ROLES.EMPTY')}
      sortFunctions={sortFunctions}
    />
  );
};

export default RolesTable;
