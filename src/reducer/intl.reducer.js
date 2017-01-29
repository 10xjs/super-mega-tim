import {combineReducers} from 'redux';
import {handleAction} from 'redux-actions';

import {SET_LOCALE} from '/action/intl.action';

const locale = (state, action) => action.payload.locale;

const mergeMessages = (state, action) => ({
  ...state,
  [action.payload.locale]: action.payload.messages,
});

export default combineReducers({
  locale: handleAction(SET_LOCALE, locale, process.env.DEFAULT_LOCALE || 'en'),
  messages: handleAction(SET_LOCALE, mergeMessages, {}),
});
