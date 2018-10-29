/*
 *
 * ForecastContainer actions
 *
 */

import {
  GET_BY_COORDS,
  GET_WEATHER,
  GET_WEATHER_FAIL,
  GET_WEATHER_SUCCESS,
} from './constants';

export function getByCoords(location, units) {
  return {
    type: GET_BY_COORDS,
    location,
    units,
  };
}
export function getWeather(city, units) {
  return {
    type: GET_WEATHER,
    city,
    units,
  };
}
export function getWeatherFail(message) {
  return {
    type: GET_WEATHER_FAIL,
    message,
  };
}
export function getWeatherSuccess(data) {
  return {
    type: GET_WEATHER_SUCCESS,
    data,
  };
}
