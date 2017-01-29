import nodeExternals from 'webpack-node-externals';

import base from './partial/base';

const config = base()({
  target: 'node',
  externals: [nodeExternals()],
  name: 'server',
  output: {
    publicPath: '/',
  },
});

export default config;
