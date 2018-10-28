import { call, put, takeLatest } from 'redux-saga/effects';

import { getWeatherFail, getWeatherSuccess } from './actions';
import { GET_WEATHER } from './constants';
// import MockData from './mockdata';

import APIACCESS from './APIACCESS';

function fetchDataFromApi(units, city) {
  return fetch(
    `${APIACCESS.url}?q=${city}&APPID=${APIACCESS.key}&units=${units}`,
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
