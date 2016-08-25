/* eslint-disable global-require */
import consoleOptions from './consoleOptions';

const plugins = [{
  register: require('good'),
  options: consoleOptions,
}, {
  register: require('inert'),
}, {
  register: require('hapi-auth-jwt'),
}];

export default plugins;
