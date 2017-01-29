import webpack from 'webpack';
import {readFileSync} from 'fs';
import path from 'path';
import git from 'git-rev-sync';
import {plugin} from 'webpack-partial';

export default () => (config) => {
  const pkg = JSON.parse(
    readFileSync(path.join(config.context, 'package.json'), 'utf8')
  );

  const sourceVersion = process.env.SOURCE_VERSION
    ? process.env.SOURCE_VERSION
    : git.long();

  return plugin(new webpack.DefinePlugin({
    'process.env.BUILD_TARGET': JSON.stringify(config.target),
    'process.env.BUILD_ENTRY_NAME': JSON.stringify(config.name),
    'process.env.SOURCE_VERSION': JSON.stringify(sourceVersion),
    'process.env.PACKAGE_NAME': JSON.stringify(pkg.name),
    'process.env.PACKAGE_VERSION': JSON.stringify(pkg.version),
  }), config);
};
