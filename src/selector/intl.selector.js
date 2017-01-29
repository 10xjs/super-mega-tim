import get from 'lodash/fp/get';
import getOr from 'lodash/fp/getOr';
import {createSelector} from 'reselect';

import {getIntl} from '/selector';

export const getLocale = createSelector(
  getIntl,
  getOr(process.env.DEFAULT_LOCALE, 'locale')
);

export const getMessages = createSelector(
  getIntl,
  get('messages'),
);

export const getCurrentMessages = createSelector(getLocale, getMessages, get);
