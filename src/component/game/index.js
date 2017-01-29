/* global require */
console.log(process.env.BUILD_TARGET);
const module = require(`./game.${process.env.BUILD_TARGET}.js`);

export default module.default;
