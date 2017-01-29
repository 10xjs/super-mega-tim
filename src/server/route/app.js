import compose from 'lodash/fp/flowRight';

// Midori.
import header from 'midori/header';
import send from 'midori/send';

// Middleware.
import context from '/server/middleware/context';
import intl from '/server/middleware/intl';
import render from '/server/middleware/render';
import page from '/server/middleware/page';
import error from '/server/middleware/error';

export default compose(
  error(),
  context,
  intl,
  render,
  page,
  header('Content-Type', 'text/html; charset=utf-8'),
  send(),
  error()
);
