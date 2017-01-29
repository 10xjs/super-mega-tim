import create from '/../lib/create-middleware';
import {createElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';

import escape from 'htmlescape';
import Page from '/component/static/page';

export const CSS_FILE = /\.css$/;
export const JS_FILE = /\.js$/;

export const assetFilter = (regExp) => ({name}) => regExp.test(name);

export const getMeta = () => ([
  {charSet: 'utf-8'},
  {httpEquiv: 'X-UA-Compatible', content: 'IE=edge,chrome=1'},
  {
    name: 'viewport',
    content: 'width=device-width, initial-scale=1.0, maximum-scale=1',
  },
  {name: 'apple-mobile-web-app-capable', content: 'yes'},
]);

export const getTitle = () => 'Checkout';

export const getLocale = (req) => req.locale;

export const getMarkup = (req, res) => res.markup;

export const getStyles = (req) => {
  const {assets = []} = req;
  return assets.filter(assetFilter(CSS_FILE));
};

export const getScripts = (req) => {
  const {assets = [], context} = req;

  const scripts = assets
    .filter(assetFilter(JS_FILE))
    // Only async chunks are given numerical names.
    .filter((asset) => !/^[0-9]/.test(asset.name))
    // Filter out hot update chunks.
    .filter((asset) => !/\.hot-update\.js$/.test(asset.name));

  const state = context.store.getState();

  scripts.unshift({
    id: 'state',
    type: 'text/json',
    content: escape(state),
  });

  return scripts;
};

export const getPath = (req) => {
  return req.url;
};

export const getPageElement = (req, res) =>
  <Page
    path={getPath(req, res)}
    meta={getMeta(req, res)}
    title={getTitle(req, res)}
    locale={getLocale(req, res)}
    markup={getMarkup(req, res)}
    styles={getStyles(req, res)}
    scripts={getScripts(req, res)}
  />;

export default create({
  request: (req, res) => Promise.resolve(req)
    .then(() => getPageElement(req, res))
    .then(renderToStaticMarkup)
    .then((markup) => (res.body = `<!DOCTYPE html>${markup}`)),
});
