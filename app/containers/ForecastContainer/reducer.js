/*
 *
 * ForecastContainer reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_WEATHER,
  GET_WEATHER_FAIL,
  GET_WEATHER_SUCCESS,
} from './constants';

export const initialState = fromJS({
  isWaiting: false,
  weather: false,
  data: {},
  city: 'New York',
  units: 'metric',
});

function forecastContainerReducer(state = initialState, action) {
  switch (action.type) {
    case GET_WEATHER:
      return state
        .set('isWaiting', true)
        .set('city', action.city)
        .set('units', action.units);
    case GET_WEATHER_FAIL:
      return state.set(('isWaiting', false));
    case GET_WEATHER_SUCCESS:
      return state
        .set('isWaiting', false)
        .set('weather', true)
        .set('data', action.data);
    default:
      return state;
  }
}

export default forecastContainerReducer;
