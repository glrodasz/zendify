import Hapi from 'hapi';
import plugins from './config/plugins';
import zendeskNodeApi from './config/zendeskNodeApi';
import ZendeskService from './services/zendesk';
import connectionParams from './config/connectionParams';
import ticketScheme from './schemes/ticket';
import { AUTH0_CLIENT_SECRET, AUTH0_CLIENT_ID } from './utils/env';

const server = new Hapi.Server();

server.connection(connectionParams());

// Register plugins
server.register(plugins, (regErr) => {
  // Log register errors
  if (regErr) {
    server.log('error', regErr);
  }

  // Authentication strategy
  server.auth.strategy('token', 'jwt', {
    key: new Buffer(AUTH0_CLIENT_SECRET, 'base64'),
    verifyOptions: {
      algorithms: ['HS256'],
      audience: AUTH0_CLIENT_ID,
    },
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
    path: '/ticket',
    handler(request, reply) {
      new ZendeskService(zendeskNodeApi)
        .createTicket(request.payload)
        .then(() => reply({ message: 'Succesfully sent.' }))
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
