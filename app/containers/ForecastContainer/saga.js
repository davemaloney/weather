import { call, put, takeLatest, all } from 'redux-saga/effects';

import {
  getWeatherFail,
  getWeatherSuccess,
  getTimezoneSuccess,
} from './actions';
import { GET_BY_COORDS, GET_WEATHER } from './constants';

function fetchTimezone(position, time) {
  return fetch(`/geoAPI/${position.lat}/${position.lon}/${time}`)
    .then(response => response.json())
    .catch(error => {
      throw Error(error);
    });
}

function* getTimezone(position, time) {
  try {
    const timezone = yield call(fetchTimezone, position, time);
    if (timezone.timeZoneId) {
      yield put(getTimezoneSuccess(timezone));
    } else if (new Date().getTimezoneOffset()) {
      throw new Error('Error');
    } else {
      throw new Error('Error');
    }
  } catch (e) {
    yield put(getWeatherFail(e.message));
  }
}

function fetchDataByCity(units, city) {
  // assume that city is a string of letters
  let queryType = 'q';
  // but if 'city' has a number in it, treat it like a zip code
  if (city.match(/\d/g)) {
    queryType = 'zip';
  }
  return fetch(`/weather/${queryType}/${city}/${units}`)
    .then(response => response.json())
    .catch(error => {
      throw Error(error);
    });
}

function fetchDataByCoords(coords, units) {
  return fetch(`/weather/pos/${coords.lat}/${coords.lon}/${units}`)
    .then(response => response.json())
    .catch(error => {
      throw Error(error);
    });
}

function* getByCoords(action) {
  try {
    const data = yield call(fetchDataByCoords, action.location, action.units);
    if (data.cod === '200') {
      yield put(getWeatherSuccess(data));
    } else if (parseInt(data.cod, 10) > 399 < 500) {
      yield put(getWeatherFail(data.message));
    } else {
      throw new Error('Error');
    }
  } catch (e) {
    yield put(getWeatherFail(e.message));
  }
}

function* getWeather(action) {
  try {
    const data = yield call(fetchDataByCity, action.units, action.city);
    // const data = MockData; // Mock Data to reduce api calls while developing
    if (data.cod === '200') {
      yield all([
        put(getWeatherSuccess(data)),
        call(getTimezone, data.city.coord, data.list[0].dt),
      ]);
    } else if (parseInt(data.cod, 10) > 399 < 500) {
      yield put(getWeatherFail(data.message));
    } else {
      throw new Error('Error');
    }
  } catch (e) {
    yield put(getWeatherFail(e.message));
  }
}

// Individual exports for testing
export default function* forecastContainerSaga() {
  yield [takeLatest(GET_BY_COORDS, getByCoords)];
  yield [takeLatest(GET_WEATHER, getWeather)];
}
