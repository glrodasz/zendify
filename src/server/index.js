/* eslint-disable global-require */
import Hapi from 'hapi';
import consoleOptions from './config/consoleOptions';
import zendeskNodeApi from './config/zendeskNodeApi';
import ZendeskService from './services/zendesk';
import connectionParams from './config/connectionParams';
import ticketScheme from './schemes/ticket';
import { AUTH0_CLIENT_SECRET } from './utils/env';

const server = new Hapi.Server();

server.connection(connectionParams());

// Register the console and inert modules
server.register([{
  register: require('good'),
  options: consoleOptions,
}, {
  register: require('inert'),
}, {
  register: require('hapi-auth-jwt'),
}], (regErr) => {
  // Log register errors
  if (regErr) {
    server.log('error', regErr);
  }

  // Authentication strategy
  server.auth.strategy('token', 'jwt', {
    key: new Buffer(AUTH0_CLIENT_SECRET, 'base64'),
    verifyOptions: { algorithms: ['HS256'] },
  });

  // Static files
  server.route({
    method: 'GET',
    path: '/public/{params*}',
    handler: {
      directory: {
        path: './public',
      },
    },
  });

  // Entry point
  server.route({
    method: 'GET',
    path: '/{params*}',
    handler: {
      file: './index.html',
    },
  });

  // Submit ticket
  server.route({
    method: 'POST',
    path: '/submit',
    handler(request, reply) {
      const zendeskService = new ZendeskService(zendeskNodeApi);

      zendeskService.createTicket(JSON.parse(request.payload))
        .then(({ result }) => {
          server.log('info', result && result.url);
          reply({ message: 'Succesfully sent.' });
        })
        .catch(error => server.log('error', error));
    },
    config: {
      auth: 'token',
      validate: {
        payload: ticketScheme,
      },
    },
  });

  // Start server
  server.start(() => {
    server.log('info', `==> 🌎  Server running at ${server.info.uri}`);
  });
});
