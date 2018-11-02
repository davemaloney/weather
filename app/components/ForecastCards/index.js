/**
 *
 * ForecastCards
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedDate } from 'react-intl';

import styles from './styles.less';

function ForecastCards(props) {
  const { forecasts, timezone } = props;
  const listItems = forecasts.map(forecast => (
    <div
      className={`${forecast.weather[0].icon}-icon ${styles.forecastCard}`}
      key={forecast.dt}
    >
      <div className={styles.temperature}>
        {Math.round(forecast.main.temp)}
        &deg;
      </div>
      <div className={styles.forecast}>
        <img
          alt={`${forecast.weather[0].main} icon`}
          src={`https://openweathermap.org/img/w/${
            forecast.weather[0].icon
          }.png`}
          className={styles.weatherIcon}
        />
        {forecast.weather[0].main}
      </div>
      <FormattedDate
        className={styles.date}
        value={new Date(forecast.dt * 1000)}
        weekday="short"
        hour="numeric"
        timeZoneName="short"
        timeZone={timezone}
        // minute="numeric"
      />
    </div>
  ));
  return (
    <div className={`forecastList ${styles.forecastList}`}>{listItems}</div>
  );
}

ForecastCards.propTypes = {
  forecasts: PropTypes.array.isRequired,
  timezone: PropTypes.string.isRequired,
};

export default ForecastCards;
