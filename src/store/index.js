/* global module require */
import identity from 'lodash/fp/identity';
import thunkMiddleware from 'redux-thunk';
import {createStore, applyMiddleware, compose} from 'redux';

import reducer from '/reducer';

export default (context) => {
  const {initialState, enhancer} = context;
  const store = createStore(reducer, initialState, compose(
    applyMiddleware(
      thunkMiddleware.withExtraArgument(context),
    ),
    enhancer || identity,
  ));

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    // Enable Webpack hot module replacement for reducers.
    module.hot.accept('../reducer', () => {
      console.log('🚒  Hot reloading reducers.'); // eslint-disable-line
      store.replaceReducer(require('../reducer').default);
    });
  }

  return {...context, store};
};
