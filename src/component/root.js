import {createElement, PropTypes} from 'react';
import {Provider} from 'react-redux';
import compose from 'recompose/compose';
import setDisplayName from 'recompose/setDisplayName';
import setPropTypes from 'recompose/setPropTypes';

import IntlProvider from '/component/intl-provider';
import Routes from '/routes';

export const render = ({store}) => (
  <Provider store={store}>
    <IntlProvider>
      <Routes/>
    </IntlProvider>
  </Provider>
);

export default compose(
  setDisplayName('Root'),
  setPropTypes({
    store: PropTypes.object.isRequired,
    routerHistory: PropTypes.object,
    renderProps: PropTypes.object,
  }),
)(render);
