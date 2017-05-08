# Zendify
An mini platform for sending tickets into Zendesk as an agent in behalf of the customer.

## Setup
1. Create a [**Zendesk**](https://www.zendesk.com/register/#getstarted) account.
2. Create a new token in **Admin** panel > **Channels** > **API**.
3. Put the **SUBDOMAIN**\*, **USERNAME**, and **TOKEN** into the `.env.example` file and rename it for `.env`.
4. Create an [**Auth0**](https://manage.auth0.com/login) account.
5. Crate a new client in **Clients** menu > **Create client** or modify the default one.
6. Set `http://localhost:3000` in **Allowed Callback URLs** and **Allowed Origins (CORS)**.
7. Get the **CLIENT ID**, **CLIENT SECRET**, and **DOMAIN** then put them into  the `.env` file as you did it before.
8. Create a new user in **Users** menu for test it.

> \*The **SUBDOMAIN** is the subdomain part of your `https://<SUBDOMAIN>.zendesk.com/` URL.

## Development
1. Follow the **Setup** steps above.
2. Install the dependencies running `npm install`.
3. Start the development mode running `npm run dev`.
4. Open the browser at `http://localhost:3000`.

> The development mode starts the server listening its changes with `nodemon`. Also, it is listening the client changes with `webpack-dev-server` that have integrated the **HMR**. Learn more about [HRM](https://github.com/webpack/docs/wiki/hot-module-replacement-with-webpack).

## Deploy to Heroku
1. Follow the **Setup** steps above but instead of put the tokens in the `.env` file you have to add them on Heroku\* and in the step 6 add your *herokuapp* domain.
2. Add them as enviroment variables in **Settings** tab > **Reveal Config Vars** button.
3. Deploy the app as usual with `git push heroku master`. [Learn more](https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction).

> \*Environment variables that you need to have on Heroku:
```
NODE_ENV              = production
NPM_CONFIG_PRODUCTION = false
ZENDESK_SUBDOMAIN     = <YOUR_SUBDOMAIN>
ZENDESK_TOKEN         = <YOUR_ZENDESK_TOKEN>
ZENDESK_USERNAME      = <YOUR_ZENDESK_USERNAME>
AUTH0_CLIENT_ID       = <YOUR_CLIENT_ID>
AUTH0_CLIENT_SECRET   = <YOUR_CLIENT_SECRET>
AUTH0_DOMAIN          = <YOUR_CLIENT_DOMAIN>
```

## Notes
The user that logs into the application should have the same email that it has as a Zendesk agent.
