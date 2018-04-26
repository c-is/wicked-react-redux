/* @flow */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import qs from 'qs';

import history from './history';
import routes from './routes/index.js';

import App from './components/App';

import configureStore from './store';

const store = configureStore();

const render = props => new Promise((resolve, reject) => {
  try {
    ReactDOM.render(
      <Provider store={store}>
        <App {...props} />
      </Provider>,
      document.getElementById('root'),
      resolve(props),
    );
  } catch (err) {
    const data = { err, ...props};
    ReactDOM.render(
      <App {...data} />,
      document.getElementById('root'),
      resolve(props),
    );
  }
});

const resolve = promise =>
  promise.then(({ location, action }) =>
    routes.resolve({
      pathname: location.pathname,
      query: qs.parse(location.search, { ignoreQueryPrefix: true }),
      location,
      action,
      render,
    }),
  );

let promise;

if (!promise) {
  promise = Promise.resolve({ location: history.location });
  history.listen(location => {
    promise = resolve(promise.then(x => ({ ...x, location })));
  });
}
promise = resolve(promise.then(x => ({ ...x })));


if (module.hot) {
  module.hot.accept('./routes', () => {
    promise = Promise.resolve({ location: history.location });
    history.listen(location => {
      promise = resolve(promise.then(x => ({ ...x, location })));
    });
  });
}

// registerServiceWorker();
