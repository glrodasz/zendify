# Zendify
An mini platform for send tickets into Zendesk.

## Setup
1. You need to create a **Zendesk** account. You can do it  [here](https://www.zendesk.com/register/#getstarted).
2. You need to create a new token. For that go to the **Admin** panel > **Channels** > **API**.
3. Put the **HOST**, **USERNAME** and **TOKEN** into the `.env.example` file and rename it into `.env`.
3. You have to create an **Auth0** account. You can do it [here](https://manage.auth0.com/login).
4. TODO: Explain the steps for auth0 setup.

*The **HOST** is the subdomain part of your `https://<HOST>.zendesk.com/` URL**.*

## Development
1. Follow the **Setup** steps above.
2. Install the dependencies running `npm install`.
3. Start the development mode running `npm run dev`.
4. Open the browser at `http://localhost:3000` for watch the changes.

*The development mode start the server listening its changes with `nodemon` also it is listening the client with `webpack-dev-server` that have integrated the **Hot Module Replacement.** Learn more about HRM [here](https://github.com/webpack/docs/wiki/hot-module-replacement-with-webpack).*

## Deploy to Heroku
1. Follow the **Setup** steps above but instead of put the keys and tokens on the `.env` file you have to add them on Heroku.
2. Add them as enviroment variables in the **Settings ** tab > **Reveal Config Vars** button on the you Heroku app:
```bash
NODE_ENV=production
NPM_CONFIG_PRODUCTION=false
ZENDESK_HOST=YOUR_HOST
ZENDESK_TOKEN=YOUR_ZENDESK_TOKEN
ZENDESK_USERNAME=YOUR_ZENDESK_USERNAME
```
3. Deploy the app as usual. `git push heroku master`.

## Roadmap
* Integrate with Auth0
* Write JSDocs
* Update README
* Order alphabetical the propTypes of the components
* Write tests
* Support 100% coverage
* Create Continuos integration
* Put badges in the README.md
