const bodyParser = require('body-parser');
const request = require('request');

const APIACCESS = require('../APIACCESS');
const { url, key } = APIACCESS.weather;

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

  app.get('/weather/:queryType/:city/:units', (req, res) => {
    const { queryType, city, units } = req.params;
    request(
      `${url}?${queryType}=${city}&APPID=${key}&units=${units}`,
      (error, response, body) => {
        res.send(body);
      },
    );
  });
  app.get('/weather/pos/:lat/:lon/:units', (req, res) => {
    const { lat, lon, units } = req.params;
    request(
      `${url}?lat=${lat}&lon=${lon}&APPID=${key}&units=${units}`,
      (error, response, body) => {
        res.send(body);
      },
    );
  });
};
