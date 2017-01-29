import base from './partial/base';

const config = base()({
  target: 'web',
  name: 'client',
  output: {
    publicPath: '/assets',
  },
});

export default config;
