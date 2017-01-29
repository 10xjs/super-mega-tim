import compose from 'lodash/flowRight';

import compression from 'midori/compression';
import cookies from 'midori/cookies';
import empty from 'midori/empty';
import graceful from 'midori/graceful';
import id from 'midori/id';
import locale from 'midori/locale';
import logging from 'midori/logging';
import secure from 'midori/secure';
import timing from 'midori/timing';
import useragent from 'midori/useragent';

export default () => {
  return compose(
    graceful(),
    timing(),
    logging(),
    secure(),
    id(),
    compression(),
    cookies(),
    locale({
      // Parse accept-language headers that match available locales. This
      // enables a fuzzy match to serve the user the best appropriate locale.
      locales: process.env.LOCALES,
    }),
    useragent(),
    empty
  );
};
