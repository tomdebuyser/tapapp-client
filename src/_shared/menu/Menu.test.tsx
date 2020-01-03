import React from 'react';
import Menu from './Menu';
import { translations } from '../../_translations';
import { renderWithRouter } from '../../_utils/testHelpers';

test('renders Menu', () => {
  const { getByText, getByAltText } = renderWithRouter(<Menu />);
  const logo = getByAltText(translations.getLabel('SILVERNEXT'));
  const usersLink = getByText(translations.getLabel('USERS'));
  expect(logo).toBeInTheDocument();
  expect(usersLink).toBeInTheDocument();
});
