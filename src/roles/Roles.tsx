import React, { useCallback, useEffect, FC } from 'react';
import { Container } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { translations } from '../_translations';
import { Icon, Button, Table, SearchInput } from '../_shared';
import { rolesSelectors } from '../_store/selectors';
import { rolesActions } from '../_store/actions';
import { HttpMetadataQuery } from '../_http/HttpMetadata';
import { useSort } from '../_hooks';
import { dateFromISOString, formatDate } from '../_utils/timeHelpers';
import { TableColumn } from '../_shared/table/Table';
import { IRole } from './_models/Role';

import './roles.scss';

const columns: TableColumn[] = [
  { name: 'name', label: 'ROLES.NAME', sortable: true },
  { name: 'createdAt', label: 'ROLES.CREATED_AT', sortable: true },
  { name: 'updatedAt', label: 'ROLES.UPDATED_AT', sortable: true },
  { name: 'permissions', label: 'ROLES.PERMISSIONS', sortable: false },
];

const renderRow = (role: IRole) => (
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

const Roles: FC = () => {
  const roles = useSelector(rolesSelectors.roles);
  const isLoading = useSelector(rolesSelectors.isGetRolesLoading);
  const dispatch = useDispatch();

  const getRoles = useCallback(
    (query?: HttpMetadataQuery) => {
      dispatch(new rolesActions.GetRoles(query));
    },
    [dispatch],
  );

  const { sortFunctions } = useSort(getRoles);
  useEffect(() => {
    getRoles();
  }, [getRoles]);

  return (
    <Container as="main" className="roles">
      <h1>{translations.getLabel('ROLES.TITLE')}</h1>
      <div className="header">
        <SearchInput get={getRoles} />
        <Button isTextLink href="/roles/create" primary>
          <Icon name="SvgAdd" size={1.6} />
          {translations.getLabel('ROLES.CREATE_ROLE')}
        </Button>
      </div>
      <Table
        columns={columns}
        renderRow={renderRow}
        data={roles}
        isLoading={isLoading}
        emptyLabel={translations.getLabel('USERS.EMPTY')}
        sortFunctions={sortFunctions}
      />
    </Container>
  );
};

export default Roles;
