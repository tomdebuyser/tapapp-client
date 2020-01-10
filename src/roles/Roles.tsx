import React, { useCallback, useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { translations } from '../_translations';
import { Icon, Button, Table, SearchInput } from '../_shared';
import { rolesSelectors } from '../_store/selectors';
import { rolesActions } from '../_store/actions';
import { HttpMetadataQuery } from '../_http/HttpMetadata';
import { useSort } from '../_hooks';
import { dateFromISOString, formatDate } from '../_utils/timeHelpers';
import { IRole } from './_models/Role';

import './roles.scss';

const renderHeader = () => {
  return (
    <Table.Row>
      <Table.HeaderCell name="name">{translations.getLabel('ROLES.NAME')}</Table.HeaderCell>
      <Table.HeaderCell name="createdAt">{translations.getLabel('ROLES.CREATED_AT')}</Table.HeaderCell>
      <Table.HeaderCell name="updatedAt">{translations.getLabel('ROLES.UPDATED_AT')}</Table.HeaderCell>
      <Table.HeaderCell>{translations.getLabel('ROLES.PERMISSIONS')}</Table.HeaderCell>
    </Table.Row>
  );
};

const renderBody = roles => {
  return roles.map((role: IRole) => (
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
  ));
};

const Roles = () => {
  const roles = useSelector(rolesSelectors.roles);
  const isLoading = useSelector(rolesSelectors.isGetRolesLoading);
  const dispatch = useDispatch();

  const getRoles = useCallback(
    (query?: HttpMetadataQuery) => {
      dispatch(new rolesActions.GetRoles(query));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const sorting = useSort(getRoles);
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
        renderHeader={renderHeader}
        renderBody={renderBody}
        data={roles}
        isLoading={isLoading}
        columnCount={1}
        emptyLabel={translations.getLabel('USERS.EMPTY')}
        sorting={sorting}
      />
    </Container>
  );
};

export default Roles;
