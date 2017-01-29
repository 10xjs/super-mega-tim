/* global require */
const module = require(`./game.${process.env.BUILD_TARGET}.js`);

export default module.default;
