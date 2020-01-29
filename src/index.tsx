import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import 'semantic-ui-less/semantic.less';
import * as Sentry from '@sentry/browser';
import App from './App';
import { config } from './config';
import { configureStore, history } from './_store/store';
import * as serviceWorker from './serviceWorker';
import './index.scss';

// Setup sentry error logging
const environmentsWithErrorLogging = ['production', 'staging'];
const needsErrorLogging = config.sentryDsn() && environmentsWithErrorLogging.includes(config.environment());
if (needsErrorLogging) {
  Sentry.init({
    dsn: config.sentryDsn(),
    environment: config.environment(),
  });
}

console.log('config.apiHost()', config.apiHost());
console.log('config.environment()', config.environment());
console.log('config.sentryDsn()', config.sentryDsn());
console.log('config.projectName()', config.projectName());

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
