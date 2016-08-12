import { PRODUCTION } from '../../common/utils/env';
import { SERVER_PORT } from '../../portConfig';

const connectionParams = () => (
  PRODUCTION
    ? { port: SERVER_PORT }
    : { host: 'localhost', port: SERVER_PORT }
);

export default connectionParams;
