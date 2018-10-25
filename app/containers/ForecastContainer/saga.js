import { call, put, takeLatest } from 'redux-saga/effects';

import { getWeatherFail, getWeatherSuccess } from './actions';
import { GET_WEATHER } from './constants';
// import MockData from './mockdata';

const KEY = '940ef3e5862e0d114d2437d33f5ca036';

function fetchDataFromApi(city) {
  return fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${KEY}`,
  )
    .then(response => response.json())
    .catch(error => {
      throw Error(error);
    });
}

function* getWeather(action) {
  try {
    const data = yield call(fetchDataFromApi, action.city);
    // const data = MockData; // Mock Data to reduce api calls while developing
    if (data.cod === '200') {
      yield put(getWeatherSuccess(data));
    } else {
      throw new Error('no data.cod');
    }
  } catch (e) {
    yield put(getWeatherFail(e.message));
  }
}

// Individual exports for testing
export default function* forecastContainerSaga() {
  yield [takeLatest(GET_WEATHER, getWeather)];
}
