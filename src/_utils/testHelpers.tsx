import React, { ReactNode, ReactElement } from 'react';
import { createMemoryHistory, History, createBrowserHistory } from 'history';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, Store } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { createEpicMiddleware } from 'redux-observable';

import createRootReducer from '../_store/rootReducer';
import rootEpic from '../_store/rootEpic';

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

function configureStore(initialState): Store {
  const history: History = createMemoryHistory();
  const epicMiddleware = createEpicMiddleware();

  const plainMapper = () => next => action => next(Object.assign({}, action));

  const store: Store = createStore(
    createRootReducer(history),
    initialState,
    compose(applyMiddleware(plainMapper, epicMiddleware, routerMiddleware(history))),
  );

  epicMiddleware.run(rootEpic);

  return store;
}

function renderWithRedux(ui, { initialState = {}, store = configureStore(initialState), ...renderOptions } = {}) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return {
    ...render(ui, {
      wrapper: Wrapper,
      ...renderOptions,
    }),
    store,
  };
}

export { renderWithRouter, renderWithRedux };
