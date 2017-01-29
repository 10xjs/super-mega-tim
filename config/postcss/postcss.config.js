/*
TODO: Waiting on `cosmiconfig` garbage before we can use ES6 in this file.
Sorry.

import autoprefixer from 'autoprefixer';

export const plugins = [
  autoprefixer({
    browsers: ['last 2 versions'],
  }),
];

export default {plugins};
*/

/* eslint-disable */
module.exports = {
  plugins: [
    require('autoprefixer')({
      browsers: ['last 2 versions'],
    }),
  ],
};
