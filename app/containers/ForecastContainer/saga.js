import { call, put, takeLatest } from 'redux-saga/effects';

import { getWeatherFail, getWeatherSuccess } from './actions';
import { GET_BY_COORDS, GET_WEATHER } from './constants';
// import MockData from './mockdata';

import APIACCESS from './APIACCESS';

function fetchDataByCity(units, city) {
  // assume that city is a string of letters
  let queryType = 'q';
  // but if 'city' has a number in it, treat it like a zip code
  if (city.match(/\d/g)) {
    queryType = 'zip';
  }
  return fetch(
    `${APIACCESS.url}?${queryType}=${city}&APPID=${
      APIACCESS.key
    }&units=${units}`,
  )
    .then(response => response.json())
    .catch(error => {
      throw Error(error);
    });
}

function fetchDataByCoords(coords, units) {
  return fetch(
    `${APIACCESS.url}?lat=${coords.lat}&lon=${coords.lon}&APPID=${
      APIACCESS.key
    }&units=${units}`,
  )
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

// Individual exports for testing
export default function* forecastContainerSaga() {
  yield [takeLatest(GET_BY_COORDS, getByCoords)];
  yield [takeLatest(GET_WEATHER, getWeather)];
}
