const path = require('path');
const Hapi = require('hapi');
const Zendesk = require('zendesk-node-api');

const zendesk = new Zendesk({
  url: `https://${process.env.ZENDESK_HOST}.zendesk.com`,
  email: process.env.ZENDESK_USERNAME,
  token: process.env.ZENDESK_TOKEN,
});

// TODO: Remove and use a common utility
const PRODUCTION = process.env.NODE_ENV === 'production';

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
      const { name, email, subject, message } = JSON.parse(request.payload);

      zendesk.tickets.create({
        subject,
        comment: {
          body: `Customer's name: ${name}
            Customer's email: ${email}
            Message: ${message}`,
          html_body: `<strong>Customer's name:</strong> ${name}<br>
            <strong>Customer's email:</strong> ${email}<br>
            <strong>Message:</strong> ${message}<br>`,
        },
      }).then(result => {
        server.log('info', result.ticket.url);
        reply({ message: 'Succesfully sent.' });
      }).catch(error => server.log('error', error));
    },
  });

  server.start(() => {
    server.log('info', `==> 🌎  Server running at ${server.info.uri}`);
  });
});
