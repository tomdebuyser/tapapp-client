import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button as SemanticButton } from 'semantic-ui-react';
import { Table, Icon } from '../_shared';
import { translations } from '../_translations';
import { usersSelectors } from '../_store/selectors';
import useModal from '../_hooks/useModal';
import { IUser } from './_models/User';
import { GetUsersAction } from './_store/actions';
import CreateUserModal from './modals/CreateUserModal';
import './users.scss';

const renderBodyRow = ({ email }: IUser) => ({
  key: email,
  cells: [email],
});

const Users: FC = () => {
  const data = useSelector(usersSelectors.users);
  const isLoading = useSelector(usersSelectors.isLoading);
  const [renderCreateUserModal, showCreateUserModal] = useModal(modalProps => <CreateUserModal {...modalProps} />);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(new GetUsersAction());
  }, [dispatch]);

  const headerRow = [translations.getLabel('USERS.EMAIL')];

  return (
    <main className="users">
      <div className="header">
        <h1>{translations.getLabel('USERS.TITLE')}</h1>
        <SemanticButton onClick={showCreateUserModal} primary>
          <Icon name="SvgAdd" size={1.6} />
          {translations.getLabel('USERS.CREATE_USER')}
        </SemanticButton>
      </div>
      <Table
        headerRow={headerRow}
        renderBodyRow={renderBodyRow}
        data={data}
        isLoading={isLoading}
        emptyLabel={translations.getLabel('USERS.EMPTY')}
      />
      {renderCreateUserModal()}
    </main>
  );
};

export default Users;
