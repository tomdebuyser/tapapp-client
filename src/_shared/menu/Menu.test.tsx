import React from 'react';
import { translations } from '../../_translations';
import { renderWithRouter } from '../../_utils/testHelpers';
import Menu from './Menu';

test('renders Menu', () => {
  const { getByText, getByAltText } = renderWithRouter(<Menu />);
  const logo = getByAltText(/silvernext/i);
  const usersLink = getByText(translations.getLabel('NAVIGATION.USERS'));
  expect(logo).toBeInTheDocument();
  expect(usersLink).toBeInTheDocument();
});
