import Hapi from 'hapi';
import Joi from 'joi';
import consoleOptions from './config/consoleOptions';
import zendeskNodeApi from './config/zendeskNodeApi';
import ZendeskService from './service/zendesk';
import connectionParams from './config/connectionParams';

const server = new Hapi.Server();

server.connection(connectionParams());

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

  // Submit request
  server.route({
    method: 'POST',
    path: '/submit',
    config: {
      validate: {
        payload: Joi.object({
          agentEmail: Joi.string().email(),
          agentName: Joi.string(),
          email: Joi.string().email(),
          message: Joi.string(),
          name: Joi.string(),
          subject: Joi.string(),
        }),
      },
      handler(request, reply) {
        const zendeskService = new ZendeskService(zendeskNodeApi);

        zendeskService.createTicket(JSON.parse(request.payload))
          .then(({ result }) => {
            server.log('info', result && result.url);
            reply({ message: 'Succesfully sent.' });
          })
          .catch(error => server.log('error', error));
      },
    },
  });

  server.start(() => {
    server.log('info', `==> 🌎  Server running at ${server.info.uri}`);
  });
});
