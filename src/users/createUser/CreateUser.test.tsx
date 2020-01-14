import React from 'react';
import user from '@testing-library/user-event';
import { Simulate } from 'react-dom/test-utils';
import { render } from '../../_utils/testHelpers';
import { translations } from '../../_translations';
import { createUser } from '../_store/api';
import { getRoles } from '../../roles/_store/api';
import { userBuilder } from '../../_mocks/users';
import CreateUser from './CreateUser';

jest.mock('../_store/api');
jest.mock('../../roles/_store/api');

describe('CreateUser component', () => {
  it('should create a user', async () => {
    (createUser as jest.Mock).mockImplementation(() => new Promise(resolve => resolve()));
    const dummyUser = userBuilder();
    (getRoles as jest.Mock).mockImplementation(() => new Promise(resolve => resolve({ meta: null, data: dummyUser.roles })));

    const { getByLabelText, getByText } = render(<CreateUser />);

    const emailInput = getByLabelText(translations.getLabel('USERS.CREATE.EMAIL'));
    const firstNameInput = getByLabelText(translations.getLabel('USERS.CREATE.FIRST_NAME'));
    const lastNameInput = getByLabelText(translations.getLabel('USERS.CREATE.LAST_NAME'));
    const roleDropdown = getByLabelText(translations.getLabel('USERS.CREATE.ROLE'));
    const createButton = getByText(translations.getLabel('SHARED.BUTTONS.CREATE'), { selector: 'button' });

    expect(emailInput).toBeInTheDocument();
    expect(firstNameInput).toBeInTheDocument();
    expect(lastNameInput).toBeInTheDocument();
    expect(roleDropdown).toBeInTheDocument();

    user.type(emailInput, dummyUser.email);
    Simulate.change(emailInput);
    user.type(firstNameInput, dummyUser.firstName);
    Simulate.change(firstNameInput);
    user.type(lastNameInput, dummyUser.lastName);
    Simulate.change(lastNameInput);
    user.click(createButton);

    expect(createUser).toHaveBeenCalledTimes(1);
    expect(createUser).toHaveBeenCalledWith({
      email: dummyUser.email,
      firstName: dummyUser.firstName,
      lastName: dummyUser.lastName,
      roleIds: [],
    });
    // await wait(() => {
    // });
  });
});
