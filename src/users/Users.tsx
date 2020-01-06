import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { translations } from '../_translations';
import { Table } from '../_shared';
import { usersSelectors } from '../_store/selectors';
import { usersActions } from '../_store/actions';
import { IUser } from './_models/User';
import './users.scss';

const renderBodyRow = ({ email }: IUser) => ({
  key: email,
  cells: [email],
});

const Users: FC = () => {
  const data = useSelector(usersSelectors.users);
  const isLoading = useSelector(usersSelectors.isLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(new usersActions.GetUsers());
  }, []);

  const headerRow = [translations.getLabel('USERS.EMAIL')];

  return (
    <main className="users">
      <h1>{translations.getLabel('USERS.TITLE')}</h1>
      <Table
        headerRow={headerRow}
        renderBodyRow={renderBodyRow}
        data={data}
        isLoading={isLoading}
        emptyLabel={translations.getLabel('USERS.EMPTY')}
      />
    </main>
  );
};

export default Users;
