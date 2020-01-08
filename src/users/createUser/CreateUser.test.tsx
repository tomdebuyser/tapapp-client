import React from 'react';
import user from '@testing-library/user-event';
import { Simulate } from 'react-dom/test-utils';
import { renderWithRedux } from '../../_utils/testHelpers';
import { translations } from '../../_translations';
import { createUser } from '../_store/api';
import { userBuilder } from '../../_mocks/users';
import CreateUser from './CreateUser';

jest.mock('../_store/api');

describe('CreateUser component', () => {
  it('should create a user', async () => {
    (createUser as jest.Mock).mockImplementation(() => new Promise(resolve => resolve()));
    const dummyUser = userBuilder();

    const { getByLabelText, getByText } = renderWithRedux(<CreateUser />);

    const emailInput = getByLabelText(translations.getLabel('USERS.EMAIL'));
    const firstNameInput = getByLabelText(translations.getLabel('USERS.FIRST_NAME'));
    const lastNameInput = getByLabelText(translations.getLabel('USERS.LAST_NAME'));
    const createButton = getByText(translations.getLabel('BUTTONS.CREATE'), { selector: 'button' });

    expect(emailInput).toBeInTheDocument();
    expect(firstNameInput).toBeInTheDocument();
    expect(lastNameInput).toBeInTheDocument();

    user.type(emailInput, dummyUser.email);
    Simulate.change(emailInput);
    user.type(firstNameInput, dummyUser.firstName);
    Simulate.change(firstNameInput);
    user.type(lastNameInput, dummyUser.lastName);
    Simulate.change(lastNameInput);

    user.click(createButton);

    expect(createUser).toHaveBeenCalledTimes(1);
    expect(createUser).toHaveBeenCalledWith(dummyUser.email, dummyUser.firstName, dummyUser.lastName);
  });
});
