import create from '/../lib/create-middleware';
import {loadLocale} from '/action/intl.action';

const initializeLocale = (req) => {
  const {context} = req;
  const {store} = context;

  // If a matching locale was not parsed from the `Accept-Language`header,
  // fall back the the default app locale.
  const locale = req.locale = req.locale || process.env.DEFAULT_LOCALE;

  return store.dispatch(loadLocale(locale)).then(() => req);
};

export default create({
  request: initializeLocale,
});
