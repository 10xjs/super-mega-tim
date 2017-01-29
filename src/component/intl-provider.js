import {createElement} from 'react';
import setDisplayName from 'recompose/setDisplayName';
import compose from 'recompose/compose';
import {connect} from 'react-redux';
import {IntlProvider} from 'react-intl';
import {createStructuredSelector} from 'reselect';

import {getLocale, getCurrentMessages} from '/selector/intl.selector';

export const render = ({locale, messages, children, ...props}) =>
  <IntlProvider
    // By default, changes to the locale at runtime may not trigger a re-render
    // of child elements. Adding a `key` prop that changes with the locale
    // pursuades React to re-render the component tree.
    key={locale}
    locale={locale}
    messages={messages}
    defaultLocale={'en'}
    children={children}
    {...props}
  />;

const mapState = createStructuredSelector({
  locale: getLocale,
  messages: getCurrentMessages,
});

export default compose(
  connect(mapState),
  setDisplayName('Configure(IntlProvider)'),
)(render);
