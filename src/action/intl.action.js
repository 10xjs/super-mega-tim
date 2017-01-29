import {createAction} from 'redux-actions';
import {loadLocaleData, loadMessages} from '/util/intl.util';
import {canUseDOM} from 'fbjs/lib/ExecutionEnvironment';

export const SET_LOCALE = 'intl/SET_LOCALE';

const setLocale = createAction(SET_LOCALE);

export const loadLocale = (locale) => (dispatch) => {
  // TODO: Dispatch PENDING, SUCCESS and FAILURE actions. With reducer for
  // reqested locale and locale loading state.

  // TODO: Check the the locale is valid from process.env.LOCALES array.

  // TODO: Update the `lang` attribute on the `html` tag to improve
  // accessibility.
  return Promise.all([loadMessages(locale), loadLocaleData(locale)])
    .then(([messages]) => {
      if (canUseDOM) {
        global.document.documentElement.setAttribute('lang', locale);
        // TODO: Set a cookie to persist this preference on subsequent requests.
      }
      dispatch(setLocale({locale, messages}));
    });
};
