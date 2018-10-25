/*
 *
 * ForecastContainer actions
 *
 */

import {
  GET_WEATHER,
  GET_WEATHER_FAIL,
  GET_WEATHER_SUCCESS,
} from './constants';

export function getWeather(city) {
  return {
    type: GET_WEATHER,
    city,
  };
}
export function getWeatherFail() {
  return {
    type: GET_WEATHER_FAIL,
  };
}
export function getWeatherSuccess(data) {
  return {
    type: GET_WEATHER_SUCCESS,
    data,
  };
}
