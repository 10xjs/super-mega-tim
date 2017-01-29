import compose from 'lodash/fp/flowRight';
import identity from 'lodash/fp/identity';

import reactHotLoader from './partial/react-hot-loader.webpack.config';
import base from './partial/base';

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

const config = compose(
  isDev ? reactHotLoader() : identity,
  base(),
)({
  target: 'web',
  name: 'client',
  output: {
    publicPath: '/assets',
  },
});

export default config;
