import 'reset-css/reset.css';
import '/global.css.js';

import createStore from '/store';
import {hashHistory} from 'react-router';

import {
  parseIntitialState,
  loadLocaleData,
  renderRoot,
  clearLoading,
} from '/client/context';

Promise.resolve()
  .then(() => ({
    // Register the Redux Dev Tools browser extension.
    enhancer: process.env.DEPLOY_ENV !== 'production'
      && global.devToolsExtension
      && global.devToolsExtension(),

    routerHistory: hashHistory,
  }))

  // Parse serialized Redux store state.
  .then(parseIntitialState)

  // Create Redux store instance.
  .then(createStore)

  // Load any required locale data.
  // Locale date for the `Intl` polyfill and `react-intl` is conditionally
  // loaded from additional async webpack chunks, depending on the locale value
  // read from the Redux state.
  .then(loadLocaleData)

  // Render the app with React.
  .then(renderRoot)

  // Clear the global loading state. This must be called _after_ the initial
  // render. If the state were to change before the initial reander, React would
  // not be able to successfully reconcile with the server rendered markup.
  .then(clearLoading)

  // Shit has hit the fan. The app failed before completing a single render.
  .catch((error) => {
    // TODO: Show some kind of failure state to the user.
    console.error('💀 🔫', error); // eslint-disable-line
    return Promise.reject(error);
  });
