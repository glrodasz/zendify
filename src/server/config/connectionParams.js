import PRODUCTION from '../../common/utils/production';
import { SERVER_PORT } from '../../common/config/port';

const connectionParams = () => (
  PRODUCTION
    ? { port: SERVER_PORT }
    : { host: 'localhost', port: SERVER_PORT }
);

export default connectionParams;
