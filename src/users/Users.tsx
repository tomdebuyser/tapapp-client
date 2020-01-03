import React, { FC, useEffect } from 'react';
import './users.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from '../_shared';
import { translations } from '../_translations';
import { usersSelectors } from '../_store/selectors';
import { IUser } from './_models/User';
import { GetUsersAction } from './_store/actions';

const renderBodyRow = ({ email }: IUser) => ({
  key: email,
  cells: [email],
});

const Users: FC = () => {
  const data = useSelector(usersSelectors.users);
  const isLoading = useSelector(usersSelectors.isLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(new GetUsersAction());
  }, [dispatch]);

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
