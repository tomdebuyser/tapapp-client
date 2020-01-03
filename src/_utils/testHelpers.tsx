import React, { ReactNode, ReactElement } from 'react';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';

function renderWithRouter(ui: ReactElement, { route = '/', history = createMemoryHistory({ initialEntries: [route] }), ...renderOptions } = {}) {
  function Wrapper({ children }: { children: ReactNode }) {
    return <Router history={history}>{children}</Router>;
  }
  return {
    ...render(ui, {
      wrapper: Wrapper,
      ...renderOptions,
    }),
    history,
  };
}

export { renderWithRouter };
