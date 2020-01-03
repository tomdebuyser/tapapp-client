import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import 'semantic-ui-less/semantic.less';

import App from './App';
import { configureStore, history } from './_store/store';
import * as serviceWorker from './serviceWorker';

import './index.scss';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
