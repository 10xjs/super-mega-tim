/* eslint-disable import/no-commonjs */
import create from '/../lib/create-middleware';
import {createElement} from 'react';
import {renderToString} from 'react-dom/server';
import {ServerRouter} from 'react-router';

let Root = require('../../component/root').default;

if (process.env.NODE_ENV !== 'production' && module.hot) {
  // Reload any changes to the root component or its dependencies.
  module.hot.accept('../../component/root', () => {
    console.log('🚒  Hot reloading components.'); // eslint-disable-line
    Root = require('../../component/root').default;
  });
}

const render = (req) => {
  return renderToString(
    <ServerRouter
      location={req.url}
      context={req.context.router}
    >
      <Root store={req.context.store}/>
    </ServerRouter>
  );
};

export default create({
  request: (req, res) => {
    res.markup = render(req);
    const result = req.context.router.getResult();
    if (result.redirect) {
      res.writeHead(301, {
        Location: result.redirect.pathname,
      });
      res.end();
    } else if (result.missed) {
      res.statusCode = 404;
      res.markup = render(req);
    }
  },
});
