import { PRODUCTION } from '../common/utils/env';

const goodOptions = {
  reporters: {
    console: [
      {
        module: 'good-console',
        args: [{
          log: PRODUCTION ? 'error' : '*',
          response: '*',
          format: 'ddd, MMM Do YYYY, h:mm:ss a',
          utc: false,
        }],
      },
      'stdout',
    ],
  },
};

export default goodOptions;
