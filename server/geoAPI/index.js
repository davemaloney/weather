const bodyParser = require('body-parser');
const request = require('request');

const APIACCESS = require('../APIACCESS');
const { url, key } = APIACCESS.googleTimezone;

module.exports = app => {
  app.use((req, res, next) => {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    // Request headers you wish to allow
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-Requested-With,content-type, Authorization',
    );

    // Pass to next layer of middleware
    next();
  });

  app.use(bodyParser.json());

  app.get('/geoAPI/:lat/:lon/:time', (req, res) => {
    const { lat, lon, time } = req.params;
    request(
      `${url}?location=${lat},${lon}&timestamp=${time}&key=${key}`,
      (error, response, body) => {
        if (!error && response.statusCode === 200) {
          console.log(body); // Print the google web page.
          res.send(body);
        }
      },
    );
  });
};
