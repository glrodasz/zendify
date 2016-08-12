import path from 'path';
import Hapi from 'hapi';
import consoleOptions from './config/consoleOptions';
import zendeskApi from './config/zendeskApi';
import ZendeskController from './controller/zendesk';
import { SERVER_PORT } from '../portConfig';

const server = new Hapi.Server();

server.connection({ port: SERVER_PORT });

// Register the console and inert modules
server.register([
  {
    register: require('good'), // eslint-disable-line global-require
    options: consoleOptions,
  },
  {
    register: require('inert'), // eslint-disable-line global-require
  },
], (registerError) => {
  if (registerError) {
    server.log('error', registerError);
  }

  // Routes

  // Static files
  server.route({
    method: 'GET',
    path: '/public/{param*}',
    handler: {
      directory: {
        path: path.join(__dirname, 'public'),
      },
    },
  });

  // Entry point
  server.route({
    method: 'GET',
    path: '/',
    handler: {
      file: path.join(__dirname, 'index.html'),
    },
  });

  // Submit request
  server.route({
    method: 'POST',
    path: '/submit',
    handler(request, reply) {
      const zendeskController = new ZendeskController(zendeskApi);

      zendeskController.createTicket(JSON.parse(request.payload))
      .then(({ result }) => {
        server.log('info', result && result.url);
        reply({ message: 'Succesfully sent.' });
      })
      .catch(error => server.log('error', error));
    },
  });

  server.start(() => {
    server.log('info', `==> 🌎  Server running at ${server.info.uri}`);
  });
});
