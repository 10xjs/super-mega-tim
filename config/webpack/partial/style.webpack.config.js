import {loader, plugin} from 'webpack-partial';
import compose from 'lodash/fp/compose';
import identity from 'lodash/fp/identity';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

// Regular expression used to detect what kind of files to process.
const IS_STYLE = /\.(scss|sass|css)$/;
const IS_CSS_JS = /\.css\.js$/;

/**
 * Generate the correct `loader` object given the parameters.
 * @param {String} target The webpack target.
 * @param {Boolean} external Whether to generate external CSS files.
 * @param {Boolean} minimize Whether to compress generated CSS.
 * @param {String} loader Loader for processing the stylesheet into CSS.
 * @returns {String} Final loader.
 */
const loaders = ({
  target,
  external,
  minimize,
  loaders,
  plugin,
  localIdentName = '[name]-[local]-[hash:base64:5]',
}) => {
  const config = {
    modules: true,
    importLoaders: 1,
    localIdentName: localIdentName,
    minimize: minimize,
    sourceMap: true,
  };
  const cssLoader = require.resolve('css-loader');
  const cssLocals = require.resolve('css-loader/locals');
  const styleLoader = require.resolve('style-loader');
  if (target === 'web') {
    if (external) {
      return [
        plugin.loader({omit: 1, remove: true}), {
          loader: styleLoader,
        }, {
          loader: cssLoader,
          query: config,
        },
        ...loaders,
      ];
    }
    return [{
      loader: styleLoader,
    }, {
      loader: cssLoader,
      query: config,
    }, ...loaders];
  }
  return [{
    loader: cssLocals,
    query: config,
  }, ...loaders];
};

export default (options) => (previous) => {
  const {extract, localIdentName, minimize} = options;
  const {target = 'web', context} = previous;
  const config = path.join(context, 'config', 'postcss');
  const external = extract && target === 'web';

  const extractor = new ExtractTextPlugin({
    filename: typeof extract === 'string' ? extract : '[name].css',
  });

  const result = compose(
    loader({
      test: IS_STYLE,
      loaders: loaders({
        loaders: [{
          loader: require.resolve('postcss-loader'),
          query: {config},
        }],
        target,
        external,
        minimize,
        plugin: extractor,
        localIdentName,
      }),
    }),
    loader({
      test: IS_CSS_JS,
      loaders: loaders({
        loaders: [{
          loader: require.resolve('postcss-loader'),
          query: {config},
        }, {
          loader: require.resolve('css-js-loader'),
        }, {
          loader: require.resolve('babel-loader'),
        }],
        target,
        external,
        minimize,
        plugin: extractor,
        localIdentName,
      }),
    }),
    // Some crawlers or things with Javascript disabled prefer normal CSS
    // instead of Javascript injected CSS, so this plugin allows for the
    // collection of the generated CSS into its own file.
    external ? plugin(extractor) : identity
  )(previous);

  return result;
};
