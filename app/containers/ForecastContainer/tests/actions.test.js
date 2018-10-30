import {
  getByCoords,
  getWeather,
  getWeatherFail,
  getWeatherSuccess,
} from '../actions';
import {
  GET_BY_COORDS,
  GET_WEATHER,
  GET_WEATHER_FAIL,
  GET_WEATHER_SUCCESS,
} from '../constants';

describe('ForecastContainer actions', () => {
  describe('Get Weather', () => {
    it('has a type of GET_WEATHER', () => {
      const expected = {
        type: GET_WEATHER,
      };
      expect(getWeather()).toEqual(expected);
    });
  });
  describe('Get By Coordinates', () => {
    it('has a type of GET_BY_COORDS', () => {
      const expected = {
        type: GET_BY_COORDS,
      };
      expect(getByCoords()).toEqual(expected);
    });
  });
  describe('Get Weather Success', () => {
    it('has a type of GET_WEATHER_SUCCESS', () => {
      const expected = {
        type: GET_WEATHER_SUCCESS,
      };
      expect(getWeatherSuccess()).toEqual(expected);
    });
  });
  describe('Get Weather', () => {
    it('has a type of GET_WEATHER_FAIL', () => {
      const expected = {
        type: GET_WEATHER_FAIL,
      };
      expect(getWeatherFail()).toEqual(expected);
    });
  });
});
