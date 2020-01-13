import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from 'semantic-ui-react';
import { Icon, Button, SearchInput } from '../_shared';
import { translations } from '../_translations';
import { usersSelectors } from '../_store/selectors';
import { usersActions } from '../_store/actions';
import { HttpMetadataQuery, FillMetadataQueryFunction } from '../_http/HttpMetadata';
import UsersTable from './UsersTable';
import './users.scss';

const Users: FC = () => {
  const users = useSelector(usersSelectors.users);
  const isLoading = useSelector(usersSelectors.isGetUsersLoading);
  const query = useSelector(usersSelectors.query);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(new usersActions.GetUsers());
  }, [dispatch]);

  const setQuery: FillMetadataQueryFunction = (partialQuery: HttpMetadataQuery) => {
    dispatch(new usersActions.SetUsersQuery({ query: { ...query, ...partialQuery } }));
  };

  return (
    <Container as="main" className="users">
      <h1>{translations.getLabel('USERS.TITLE')}</h1>
      <div className="header">
        <SearchInput query={query} setQuery={setQuery} />
        <Button isTextLink href="/users/create" primary>
          <Icon name="SvgAdd" size={1.6} />
          {translations.getLabel('USERS.CREATE_USER')}
        </Button>
      </div>
      <UsersTable data={users} isLoading={isLoading} setQuery={setQuery} />
    </Container>
  );
};

export default Users;
