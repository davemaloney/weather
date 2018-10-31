# Changelog

## October 2018

A brand new weather forecasting app! Hooray!

The two most important files to get how things are put together are [app/containers/ForecastContainer/index.js](app/containers/ForecastContainer/index.js) [app/containers/ForecastContainer/saga.js](app/containers/ForecastContainer/saga.js). The ForecastContainer `index.js` contains all the form and submission handlers, and `sagas.js` handles all the interaction with the API.

**NOTE**: Followed directions in [docs/general/remove.md](docs/general/remove.md) to remove image optimization by [image-webpack-loader@4.4.0](https://github.com/tcoopman/image-webpack-loader) from [package.json](package.json) and [internals/webpack/webpack.base.babel.js](internals/webpack/webpack.base.babel.js#L87) due to a peer dependency on `webpack-cli@^2.1.5` that was causing `WARN` errors on install. `webpack-cli@3.1.2` is installed and required for the build scripts.
