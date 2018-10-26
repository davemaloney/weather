import { call, put, takeLatest } from 'redux-saga/effects';

import { getWeatherFail, getWeatherSuccess } from './actions';
import { GET_WEATHER } from './constants';
// import MockData from './mockdata';

const KEY = '940ef3e5862e0d114d2437d33f5ca036';

function fetchDataFromApi(units, city) {
  return fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${KEY}&units=${units}`,
  )
    .then(response => response.json())
    .catch(error => {
      throw Error(error);
    });
}

function* getWeather(action) {
  try {
    const data = yield call(fetchDataFromApi, action.units, action.city);
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
  yield [takeLatest(GET_WEATHER, getWeather)];
}
