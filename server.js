const path = require('path');
const Hapi = require('hapi');

// TODO: Remove and instead use the utils/env
const PRODUCTION = process.env.NODE_ENV === 'production';

const goodOptions = {
  reporters: {
    console: [
      {
        module: 'good-console',
        args: [{ log: PRODUCTION ? 'error' : '*', response: '*' }],
      },
      'stdout',
    ],
  },
};

const server = new Hapi.Server();

server.connection({ host: 'localhost', port: 8000 });

server.register([{
  register: require('good'), // eslint-disable-line global-require
  options: goodOptions,
}, {
  register: require('inert'), // eslint-disable-line global-require
}], (err) => {
  if (err) {
    throw err;
  }

  server.route({
    method: 'GET',
    path: '/dist/{param*}',
    handler: {
      directory: {
        path: path.join(__dirname, 'dist'),
      },
    },
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: {
      file: path.join(__dirname, 'index.html'),
    },
  });

  server.route({
    method: 'POST',
    path: '/submit',
    handler(request, reply) {
      reply({ message: 'Succesfully sent.' });
    },
  });

  server.start(() => {
    server.log('info', `==> 🌎  Server running at ${server.info.uri}`);
  });
});
