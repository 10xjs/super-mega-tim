import compose from 'lodash/fp/compose';
import {readFileSync} from 'fs';
import {dirname} from 'path';
import match from 'midori/match';
import path from 'midori/match/path';
import serve from 'midori/serve';

import devAssets from 'webpack-udev-server/runtime/dev-assets';

const ASSET_STATS = './dist/client/stats.json';

/**
 * @param {String} file Path to webpack stats object.
 * @param {Object} options Options passed to `serve`.
 * @returns {Function} Middleware.
 */
export const staticAssets = (file, options = {root: dirname(file)}) => {
  const {publicPath} = JSON.parse(readFileSync(file));
  return match(path(publicPath), serve(options));
};

export const assetData = (file) => {
  const {assets: base, publicPath} = JSON.parse(readFileSync(file));
  const assets = base.map((asset) => ({
    ...asset,
    url: `${publicPath}/${asset.name}`,
  }));
  return (app) => ({
    ...app,
    request: (req, res) => {
      req.assets = assets;
      app.request(req, res);
    },
  });
};

export default () => process.env.IPC_URL ?
  devAssets(ASSET_STATS) : compose(
    staticAssets(ASSET_STATS),
    assetData(ASSET_STATS)
  );
