/* global require module */
import {createElement} from 'react';
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {BrowserRouter} from 'react-router';

import {setLoading} from '/action/status.action';
import {getLocale} from '/selector/intl.selector';
// Prevent conflict with local `loadLocaleData` export.
import {loadLocaleData as _loadLocaleData} from '/util/intl.util';

// The following functions operate on the client context object to establish
// the lifecycle events of the client app.
//
// Each of these functions must adhere to the same signature. It receives a
// single argument representing the current client session context and returns
// either the context or a promise fulfilling the context.

/**
 * Parse the serialized Redux store state provided by the server.
 *
 * @param {Object} context - A client context object.
 * @returns {Object} A client context object.
 */
export const parseIntitialState = (context) => {
  // TODO: Make this function pure. Assign an `initialStateContainer` value to
  // the context object in the client entry file.
  const stateContainer = global.document.getElementById('state');
  let initialState;

  try {
    initialState = JSON.parse(stateContainer.textContent);
  } catch (e) {
    throw new Error('Failed to parse initial state.');
  }

  return {...context, initialState};
};

/**
 * Load any initial locale data required for the current locale.
 *
 * @param {Object} context - A client context object.
 * @param {Object} context.store - A Redux store object.
 * @returns {Object} A client context object.
 */
export const loadLocaleData = (context) =>
  _loadLocaleData(getLocale(context.store.getState()))
  .then(() => context);

/**
 * Render the `<Root>` component into the DOM. Uses `<AppContainer>` from
 * `react-hot-loader` to enable hot component reloading outside of the
 * `production` env. In `production`, `<AppContainer>` is shimmed to a simple
 * pass-through render component.
 *
 * @param {Object} context - A client context object.
 * @param {Object} context.store - A Redux store object.
 * @param {Object} context.routerHistory - A react-router history object.
 * @returns {Object} A client context object.
 */
export const renderRoot = (context) => {
  const {store} = context;

  // Render the app using React Hot Loader 3.
  //
  // AppContainer just renders the root component in production.
  // Bundling it is not a problem as it is stubbed to an identity component.
  //
  // The closest thing to documentation at the moment is this issue on github:
  // https://github.com/gaearon/react-hot-loader/issues/243
  const hot = () => {
    const Root = require('../component/root').default;

    return render((
      <BrowserRouter>
        <AppContainer>
         <Root store={store}/>
        </AppContainer>
      </BrowserRouter>
      // TODO: Make this function pure. Assign a render function to the context
      // object from the entry file.
      //
      // i.e.
      //
      // createContext({
      //    render(element) => render(element, document.getElementById('app')),
      //    ...
      // })
    ), global.document.getElementById('app'));
  };

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    // Reload any changes to the root component or its dependencies.
    module.hot.accept('../component/root', () => {
      console.log('🚒  Hot reloading components.'); // eslint-disable-line
      hot();
    });
  }

  hot();

  return context;
};

/**
 * Clear the global loading state.
 *
 * @param {Object} context - A client context object.
 * @param {Object} context.store - A Redux store object.
 * @returns {Object} A client context object.
 */
export const clearLoading = (context) => {
  const {store} = context;
  store.dispatch(setLoading(false));

  return context;
};
