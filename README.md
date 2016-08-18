# Zendify
An mini platform for send tickets into Zendesk.

## Setup
1. Create a **Zendesk** account. You can do it  [here](https://www.zendesk.com/register/#getstarted).
2. Create a new token. For that go to the **Admin** panel > **Channels** > **API**.
3. Put the **SUBDOMAIN**, **USERNAME** and **TOKEN** into the `.env.example` file and rename it into `.env`.
4. Create an **Auth0** account. You can do it [here](https://manage.auth0.com/login).
5. Crate a new client in **Clients** menu > **Create client** or modify the default one.
6. Set the `http://localhost:300` in **Allowed Callback URLs** and **Allowed Origins (CORS)**.
7. Get the **CLIENT ID** and **DOMAIN** put them into  the `.env` file as you did it before.
8. Create a new user in the **Users** menu in order to test it.

> The **SUBDOMAIN** is the subdomain part of your `https://<SUBDOMAIN>.zendesk.com/` URL.

## Development
1. Follow the **Setup** steps above.
2. Install the dependencies running `npm install`.
3. Start the development mode running `npm run dev`.
4. Open the browser at `http://localhost:3000` for watch the changes.

> The development mode start the server listening its changes with `nodemon` also it is listening the client with `webpack-dev-server` that have integrated the **Hot Module Replacement**. Learn more about HRM [here](https://github.com/webpack/docs/wiki/hot-module-replacement-with-webpack).

## Deploy to Heroku
1. Follow the **Setup** steps above but instead of put the keys and tokens on the `.env` file you have to add them on Heroku.
2. Add them as enviroment variables in the **Settings** tab > **Reveal Config Vars** button on the you Heroku app.
3. Deploy the app as usual. `git push heroku master`.

> Environment variables that you need to have on Heroku:
```bash
NODE_ENV=production
NPM_CONFIG_PRODUCTION=false
ZENDESK_SUBDOMAIN=YOUR_SUBDOMAIN
ZENDESK_TOKEN=YOUR_ZENDESK_TOKEN
ZENDESK_USERNAME=YOUR_ZENDESK_USERNAME
AUTH0_CLIENT_ID=YOUR_CLIENT_ID
AUTH0_DOMAIN=YOUR_CLIENT_DOMAIN
```

## Roadmap
* Integrate with Auth0
* Write JSDocs
* Order alphabetical the propTypes of the components
* Write tests
* Support 100% coverage
* Create Continuos integration
* Put badges in the README.md
