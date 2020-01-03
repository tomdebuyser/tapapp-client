import React, { FC } from 'react';
import './users.scss';
import { Table } from '../_shared';
import { translations } from '../_translations';
import { IUser } from './_models/User';

const renderBodyRow = ({ email }: IUser) => ({
  key: email,
  cells: [email],
});

const Users: FC = () => {
  const headerRow = [translations.getLabel('USERS.EMAIL')];
  const data = [{ email: 'test@icapps.com' }, { email: 'admin@icapps.com' }];

  return (
    <main className="users">
      <h1>{translations.getLabel('USERS.TITLE')}</h1>
      <Table headerRow={headerRow} renderBodyRow={renderBodyRow} data={data} />
    </main>
  );
};

export default Users;
