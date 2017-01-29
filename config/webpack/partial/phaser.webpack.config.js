import {plugin} from 'webpack-partial';
import {ProvidePlugin} from 'webpack';

export default () => plugin(new ProvidePlugin({
  PIXI: 'phaser/build/pixi.js',
  p2: 'phaser/build/p2',
}));
