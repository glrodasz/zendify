/* eslint-disable */
import { PRODUCTION } from '../../common/utils/env';

if (PRODUCTION) {
  module.exports = require('./configureStore.prod');
} else {
  module.exports = require('./configureStore.dev')
}
