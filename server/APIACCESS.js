const APIACCESS = {
  weather: {
    url: 'https://api.openweathermap.org/data/2.5/forecast',
    key: '61f4ba5316dfdc9bc7c08b9edd2709af',
  },
  googleTimezone: {
    url: 'https://maps.googleapis.com/maps/api/timezone/json',
    key: 'AIzaSyCp0LWf4kisfGR_ptCQTaUL2HVtNJR_9FM',
  },
};

// Whenever this file needs to change, use this template this, and then
// $ git update-index --assume-unchanged server/APIACCESS.js
//
// const APIACCESS = {
//   weather: {
//     url: 'https://api.openweathermap.org/data/2.5/forecast',
//     key: 'YOUR_API_KEY',
//   },
//   googleTimezone: {
//     url: 'https://maps.googleapis.com/maps/api/timezone/json',
//     key: 'YOUR_API_KEY',
//   },
// };
//

module.exports = APIACCESS;
