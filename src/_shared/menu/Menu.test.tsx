import React from 'react';
import { translations } from '../../_translations';
import { render } from '../../_utils/testHelpers';
import Menu from './Menu';

test('renders Menu', () => {
  const { getByText, getByAltText } = render(<Menu />);
  const logo = getByAltText(/silvernext/i);
  const usersLink = getByText(translations.getLabel('SHARED.NAVIGATION.USERS'));
  expect(logo).toBeInTheDocument();
  expect(usersLink).toBeInTheDocument();
});
