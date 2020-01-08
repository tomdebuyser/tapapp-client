import React from 'react';
import { wait } from '@testing-library/react';
import { renderWithRedux } from '../_utils/testHelpers';
import { translations } from '../_translations';
import { userBuilder } from '../_mocks/users';
import { formatDate, dateFromISOString } from '../_utils/timeHelpers';
import { HttpMetadataPagingResponse } from '../_http/HttpMetadata';
import Users from './Users';
import { getUsers } from './_store/api';

jest.mock('./_store/api');

const fakeUser = userBuilder();
const dummyMeta: HttpMetadataPagingResponse = {
  count: 1,
  totalCount: 1,
};

describe('Users component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should show a table of all users', async () => {
    (getUsers as jest.Mock).mockImplementation(() => new Promise(resolve => resolve({ data: [fakeUser], meta: dummyMeta })));

    const { getByText } = renderWithRedux(<Users />);

    await wait(() => {
      expect(getUsers).toHaveBeenCalledTimes(1);
      const emailColumnHeader = getByText(translations.getLabel('USERS.EMAIL'));
      const firstNameHeader = getByText(translations.getLabel('USERS.FIRST_NAME'));
      const lastNameHeader = getByText(translations.getLabel('USERS.LAST_NAME'));
      const createdAtColumnHeader = getByText(translations.getLabel('USERS.CREATED_AT'));
      const updatedAtColumnHeader = getByText(translations.getLabel('USERS.UPDATED_AT'));
      const stateColumnHeader = getByText(translations.getLabel('USERS.STATE'));

      const email = getByText(fakeUser.email);
      const firstName = getByText(fakeUser.firstName);
      const lastName = getByText(fakeUser.lastName);
      const createdAt = getByText(formatDate(dateFromISOString(fakeUser.createdAt)));
      const updatedAt = getByText(formatDate(dateFromISOString(fakeUser.updatedAt)));
      const userState = getByText(fakeUser.state);

      expect(emailColumnHeader).toBeInTheDocument();
      expect(firstNameHeader).toBeInTheDocument();
      expect(lastNameHeader).toBeInTheDocument();
      expect(createdAtColumnHeader).toBeInTheDocument();
      expect(updatedAtColumnHeader).toBeInTheDocument();
      expect(stateColumnHeader).toBeInTheDocument();

      expect(email).toBeInTheDocument();
      expect(firstName).toBeInTheDocument();
      expect(lastName).toBeInTheDocument();
      expect(createdAt).toBeInTheDocument();
      expect(updatedAt).toBeInTheDocument();
      expect(userState).toBeInTheDocument();
    });
  });

  it('Should display a message when there are no users', async () => {
    (getUsers as jest.Mock).mockImplementation(() => new Promise(resolve => resolve({ data: [], meta: dummyMeta })));

    const { queryByText, getByText } = renderWithRedux(<Users />);
    const emailColumnHeader = getByText(translations.getLabel('USERS.EMAIL'));
    const createdAtColumnHeader = getByText(translations.getLabel('USERS.CREATED_AT'));
    const updatedAtColumnHeader = getByText(translations.getLabel('USERS.UPDATED_AT'));
    const stateColumnHeader = getByText(translations.getLabel('USERS.STATE'));

    expect(emailColumnHeader).toBeInTheDocument();
    expect(createdAtColumnHeader).toBeInTheDocument();
    expect(updatedAtColumnHeader).toBeInTheDocument();
    expect(stateColumnHeader).toBeInTheDocument();
    expect(getUsers).toHaveBeenCalledTimes(1);

    await wait(() => {
      const emptyText = getByText(translations.getLabel('USERS.EMPTY'));
      const email = queryByText(fakeUser.email);
      const createdAt = queryByText(formatDate(dateFromISOString(fakeUser.createdAt)));
      const updatedAt = queryByText(formatDate(dateFromISOString(fakeUser.updatedAt)));
      const userState = queryByText(fakeUser.state);

      expect(email).toBeNull();
      expect(createdAt).toBeNull();
      expect(updatedAt).toBeNull();
      expect(userState).toBeNull();
      expect(emptyText).toBeInTheDocument();
    });
  });
});
