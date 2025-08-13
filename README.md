# outfit7-expertise-test-filip

## Project setup

```
git clone https://github.com/merchantry/outfit7-expertise-test-filip.git
cd outfit7-expertise-test-filip
npm install
npm run serve
```

## Compile and build the analytics plugin

```
npm run build:analytics
```

The analytics plugin is stored in the `analytics_plugin` directory and running the build command will create a production-ready version of the plugin in the `public` directory.

You will need to paste the script tag from the dashboard into your project with the apiKey

```html
<script src="<%= BASE_URL %>analytics_plugin.js?apiKey=<% ANALYTICS_API_KEY %>"></script>
```

The `BASE_URL` must point to a live instance of your application.

The `ANALYTICS_API_KEY` will be provided in the dashboard.
