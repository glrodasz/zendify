/* eslint-disable */
import { PRODUCTION } from '../../src/common/utils/env';

if (PRODUCTION) {
  module.exports = require('./configureStore.prod');
} else {
  module.exports = require('./configureStore.dev')
}
