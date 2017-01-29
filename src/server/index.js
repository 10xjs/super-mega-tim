// import '/server/exception-handler';

import compose from 'lodash/fp/flowRight';

// Midori.
import empty from 'midori/empty';
import send from 'midori/send';
import status from 'midori/status';
import match from 'midori/match';
import path from 'midori/match/path';

// Middleware.
import base from '/server/middleware/base';
import assets from '/server/middleware/assets';
import error from '/server/middleware/error';

// Routes.
import app from '/server/route/app';

const notFound = compose(status(404), send());

export default compose(
  error(),
  match(path('/favicon.ico'), notFound),
  base(),
  assets(),
  match(path('/'), app),
  error(),
  empty,
);
