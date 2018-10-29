/*
 *
 * ForecastContainer reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_BY_COORDS,
  GET_WEATHER,
  GET_WEATHER_FAIL,
  GET_WEATHER_SUCCESS,
} from './constants';

export const initialState = fromJS({
  isWaiting: false,
  weather: false,
  data: {},
  location: null,
  city: '',
  units: 'imperial',
  message: null,
});

function forecastContainerReducer(state = initialState, action) {
  switch (action.type) {
    case GET_BY_COORDS:
      return state
        .set('isWaiting', true)
        .set('city', '')
        .set('units', action.units)
        .set('location', action.location);
    case GET_WEATHER:
      return state
        .set('isWaiting', true)
        .set('city', action.city)
        .set('units', action.units)
        .set('location', null);
    case GET_WEATHER_FAIL:
      return state.set('isWaiting', false).set('message', action.message);
    case GET_WEATHER_SUCCESS:
      return state
        .set('isWaiting', false)
        .set('weather', true)
        .set('data', action.data)
        .set('message', null)
        .set('city', action.data.city.name)
        .set('cityInput', action.data.city.name)
        .set('location', action.data.city.coord);
    default:
      return state;
  }
}

export default forecastContainerReducer;
