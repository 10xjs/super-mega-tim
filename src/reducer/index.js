import {combineReducers} from 'redux';

import {reducer as form} from 'redux-form';
import intl from '/reducer/intl.reducer';

export default combineReducers({
  intl,
  form,
});
