import React from 'react';
import { wait } from '@testing-library/react';
import { renderWithRedux } from '../_utils/testHelpers';
import { translations } from '../_translations';
import Users from './Users';
import { getUsers } from './_store/api';

jest.mock('./_store/api');

const dummyUser = { email: 'test@icapps.com' };

describe('Users component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should show a table of all users', async () => {
    (getUsers as jest.Mock).mockImplementation(() => new Promise(resolve => resolve([dummyUser])));

    const { getByText } = renderWithRedux(<Users />);

    expect(getUsers).toHaveBeenCalledTimes(1);

    await wait(() => {
      const emailColumnHeader = getByText(translations.getLabel('USERS.EMAIL'));
      const cellValue = getByText(dummyUser.email);

      expect(emailColumnHeader).toBeInTheDocument();
      expect(cellValue).toBeInTheDocument();
    });
  });

  it('Should display a message when there are no users', async () => {
    (getUsers as jest.Mock).mockImplementation(() => new Promise(resolve => resolve([])));

    const { queryByText, getByText } = renderWithRedux(<Users />);
    const emailColumnHeader = getByText(translations.getLabel('USERS.EMAIL'));

    expect(emailColumnHeader).toBeInTheDocument();
    expect(getUsers).toHaveBeenCalledTimes(1);

    await wait(() => {
      const emptyText = getByText(translations.getLabel('USERS.EMPTY'));
      const cellValue = queryByText(dummyUser.email);

      expect(cellValue).toBeNull();
      expect(emptyText).toBeInTheDocument();
    });
  });
});
