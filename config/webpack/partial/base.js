import compose from 'lodash/fp/flowRight';
import set from 'lodash/fp/set';
import identity from 'lodash/fp/identity';
import nearest from 'find-nearest-file';
import path from 'path';
import StatsPlugin from 'stats-webpack-plugin';

import {output, loader, plugin} from 'webpack-partial';
import hot from 'webpack-config-hot';
import devServer from 'webpack-config-dev-server';
import buildInfo from './build-info.webpack.config';
import style from './style.webpack.config';
import locale from './locale.webpack.config';
import phaser from './phaser.webpack.config';

const context = path.dirname(nearest('package.json'));
const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

export default () => (config) => compose(
  // ========================================================================
  // Stats
  // ========================================================================
  plugin(new StatsPlugin('stats.json')),

  /*
  * Inject additional modules depending on the environment target.
  */
  // TODO: dev-server requires HMR. the dev-server should actually be checking
  // this constraint in the webpack config and warning otherwise.
  isDev ? hot() : identity,

  // The devServer() must be applied before the hot() config.
  // (compose evaluates bottom-to-top)
  // TODO: dev-server should warn if missing the injected runtimes.
  isDev ? devServer() : identity,

  // ========================================================================
  // Partials
  // ========================================================================
  locale(),

  // Inject `BUILD_TARGET` and `BUILD_ENTRY_NAME`
  buildInfo(),

  phaser(),

  style((process.env.NODE_ENV === 'production' ? {
    localIdentName: '[hash:base64]',
    // Append a content hash to prevent browser chaching between releases.
    // Files will only be extracted in web targeted builds.
    extract: '[name].[hash].css',
    minimize: true,
  } : {
    // In development builds, use verbose class identifiers and disable
    // exteranal css file extraction to enable hot style reloading.
    localIdentName: '[name]--[local]--[hash:base64:5]',
    extract: isDev ? false : 'index.css',
    minimize: false,
  })),

  // ========================================================================
  // Loaders
  // ========================================================================
  loader({
    test: /\.js$/,
    exclude: /node_modules/,
    loader: require.resolve('babel-loader'),
  }),
  loader({
    test: /\.json$/,
    loader: require.resolve('json-loader'),
  }),
  loader({
    test: /\.(png|jpg)$/,
    loader: require.resolve('file-loader'),
  }),

  // ========================================================================
  // Output Settings
  // ========================================================================
  //
  // Define chunk file name pattern. Use the content hash as the filename in
  // production web targeted builds to prevent browser caching between releases.
  output({
    path: path.join(context, 'dist', config.name),
    ...process.env.NODE_ENV === 'production' && config.target === 'web' ? {
      filename: '[name].[chunkhash].js',
      chunkFilename: '[id].[name].[chunkhash].js',
    } : {
      filename: '[name].js',
      chunkFilename: '[id].[name].js',
    },
  }),

  // Define an entry chunk. A `name` property must be defined on the initial
  // config object.
  set('entry', {
    index: path.join(context, 'entry', `${config.name}.entry.js`),
  }),

  // Define the build root context as the nearest directory containing a
  // `package.json` file. This is be the absolute path to the project root.
  set('context', context),
)(config);
