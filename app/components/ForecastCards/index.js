/**
 *
 * ForecastCards
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedDate } from 'react-intl';

import styles from './styles.less';

// import messages from './messages';

function ForecastCards(props) {
  const { forecasts } = props;
  const listItems = forecasts.map(forecast => (
    <div
      className={`${forecast.weather[0].icon}-icon ${styles.forecastCard}`}
      key={forecast.dt}
    >
      {Math.round(forecast.main.temp)}
      &deg;
      <br />
      <img
        alt={`${forecast.weather[0].main} icon`}
        src={`http://openweathermap.org/img/w/${forecast.weather[0].icon}.png`}
      />
      <br />
      {forecast.weather[0].main}
      <br />
      <FormattedDate
        value={new Date(forecast.dt * 1000)}
        weekday="short"
        hour="numeric"
        timeZoneName="short"
        // minute="numeric"
      />
      <hr />
    </div>
  ));
  return (
    <div className={`forecastList ${styles.forecastList}`}>{listItems}</div>
  );
}

ForecastCards.propTypes = {
  forecasts: PropTypes.array.isRequired,
};

export default ForecastCards;
