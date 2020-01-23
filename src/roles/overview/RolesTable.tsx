import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { FillMetadataQueryFunction, HttpSortDirection } from '../../_http/HttpMetadata';
import Table, { TableColumn } from '../../_shared/table/Table';
import { formatDate, dateFromISOString } from '../../_utils/timeHelpers';
import { useTableSort, useInfiniteScroll } from '../../_hooks';
import { translations } from '../../_translations';
import { rolesSelectors } from '../../_store/selectors';
import { IRole } from '../_models/Role';

interface Props {
  data?: IRole[];
  isLoading: boolean;
  setQuery: FillMetadataQueryFunction;
}

const columns: TableColumn[] = [
  { name: 'name', label: 'ROLES.OVERVIEW.NAME', sortable: true },
  { name: 'createdAt', label: 'ROLES.OVERVIEW.CREATED_AT', sortable: true },
  { name: 'updatedAt', label: 'ROLES.OVERVIEW.UPDATED_AT', sortable: true },
  { name: 'permissions', label: 'ROLES.OVERVIEW.PERMISSIONS' },
];

const RolesTable: FC<Props> = ({ data, isLoading, setQuery }) => {
  const metadata = useSelector(rolesSelectors.metadata);

  const { sortFunctions } = useTableSort((column: string, direction: HttpSortDirection) =>
    setQuery({ sortBy: column, sortDirection: direction, skip: 0 }),
  );
  useInfiniteScroll((skip: number) => setQuery({ skip }), metadata, isLoading);

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
      data={data}
      emptyLabel={translations.getLabel('ROLES.OVERVIEW.EMPTY')}
      isLoading={isLoading}
      renderRow={renderRow}
      sortFunctions={sortFunctions}
    />
  );
};

export default RolesTable;
