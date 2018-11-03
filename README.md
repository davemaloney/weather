# Weather Forecast Demonstration

## About

Built as a demonstration project, this weather forecast utility is based on [React Boilerplate](https://github.com/react-boilerplate/react-boilerplate). The basic package has been modified to use CSS Modules and Less.

## Prerequisites

- Package management is done via [NPM](https://www.npmjs.com/). **Expect NPM at or above version 5 and Node at or above version 8.10.** (Built with NPM 6.5.4 and Node 11.0.0)
- Weather API information is sourced from [OpenWeatherMap](https://openweathermap.org/). Please [obtain an API key](https://openweathermap.org/appid) before beginning.
- Timezone information is sourced from [Google Timezone API](https://developers.google.com/maps/documentation/timezone/start), for which [you'll also need a key](https://cloud.google.com/maps-platform/?apis=places).

## Development

React Boilerplate uses HMR and webpack to serve a local page and update the view as you develop.

1. Clone repository and move into `/weather` directory:
   ```sh
   $ git clone https://github.com/davemaloney/weather.git
   $ cd weather
   ```
1. **Important:** Add API Keys to [server/APIACCESS.js](server/APIACCESS.js):
   ```js
   const APIACCESS = {
     weather: {
       url: 'https://api.openweathermap.org/data/2.5/forecast',
       key: 'YOUR_API_KEY',
     },
     googleTimezone: {
       url: 'https://maps.googleapis.com/maps/api/timezone/json',
       key: 'YOUR_API_KEY',
     },
   };
   ```
1. Install dependencies:
   ```sh
   $ npm install
   ```
1. Run site at [http://localhost:3000/](http://localhost:3000/) with webpack dev server:
   ```sh
   $ npm start
   ```

<!-- Run tests & coverage report:

```sh
npm test
```

Watch tests:

```sh
npm run test-watch
``` -->

## Known Issues and TODO

- Need to consider data source. Three-hour intervals are a lot of data for five days, but not really that much data for one day. Issues this causes:
  - Could be better UX to give tighter intervals for today's weather and high-level forecasts for next several days.
  - How useful is overnight data, really?
  - What's the actual application of this? Is the $40/month plan worth it to get succinct daily forecasts?
  - Did not investigate other data sources. This one is great, but is there a more efficient service if we might use fewer features?
- Design focuses on temperature, general description, and time. Given that we've got the data, it would be great to create an options menu to allow user to select or hide humidity, pressure, and wind. Would be great to get some insight into what the users want. Maybe this is for a kite-flying club and wind direction is the most important metric.
- Sourcing weather icons from OpenWeatherMap, but they are very bland. Would be great to get some nicer ones.
- Should use cloud cover data in some way.
- ~~Timezone is always given in the user's local time; ideally this would be the time at the location of the forecast. Day/night indicators together with the timezone display help a bit with this, but it's still a bit confusing.~~
- Need to give a user a list of locations to choose from when ambiguous text is entered ("Fairfield"), rather than choosing for them.
- Think of other ways to take user input? Maybe select a place on a map (easy use case for `getByCoords`).
- OpenWeatherMap documentation implies that international postal codes might work when given the country code, but have not been able to reproduce this successfully.
- Analytics?
- Testing and validation needs improvement.
- Remove cruft from React Boilerplate.
- ~~Move API requests server-side~~

## Documentation

This is all taken directly from React Boilerplate.

- [**The Hitchhikers Guide to `react-boilerplate`**](docs/general/introduction.md): An introduction for newcomers to this boilerplate.
- [Overview](docs/general): A short overview of the included tools
- [**Commands**](docs/general/commands.md): Getting the most out of this boilerplate
- [Testing](docs/testing): How to work with the built-in test harness
- [Your app](docs/js): Supercharging your app with Routing, Redux, simple
  asynchronicity helpers, etc.
- [**Troubleshooting**](docs/general/gotchas.md): Solutions to common problems faced by developers.

## License

This project is licensed under the MIT license, Copyright (c) 2018 Maximilian
Stoiber & Dave Maloney. For more information see `LICENSE.md`.
