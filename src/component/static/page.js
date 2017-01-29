import {createElement, PropTypes} from 'react';
import compose from 'recompose/compose';
import setDisplayName from 'recompose/setDisplayName';
import setPropTypes from 'recompose/setPropTypes';

import Script from './script';
import Style from './style';

export const render = ({
  markup = '',
  meta = [],
  scripts = [],
  styles = [],
  path = '/',
  title,
  locale,
}) =>
  <html lang={locale}>
    <head>
      {meta.map((tag, i) => <meta key={i} {...tag}/>)}
      <title>{title}</title>
      {styles.map((style, i) => <Style key={i} {...style}/>)}
    </head>
    <body data-path={path}>
      <div id='app' dangerouslySetInnerHTML={{__html: markup}}/>
      {scripts.map((script, i) => <Script key={i} {...script}/>)}
    </body>
  </html>;

export default compose(
  setDisplayName('Static/Page'),
  setPropTypes({
    markup: PropTypes.string.isRequired,
    meta: PropTypes.arrayOf(PropTypes.object),
    scripts: PropTypes.arrayOf(PropTypes.object),
    styles: PropTypes.arrayOf(PropTypes.object),
    path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    locale: PropTypes.string.isRequired,
  }),
)(render);
