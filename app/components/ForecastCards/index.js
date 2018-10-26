/**
 *
 * ForecastCards
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedDate } from 'react-intl';
// import messages from './messages';

function ForecastCards(props) {
  const { forecasts } = props;
  const listItems = forecasts.map(forecast => (
    <div key={forecast.dt}>
      {Math.round(forecast.main.temp)}
      &deg;
      <br />
      {forecast.weather[0].main}
      <br />
      <FormattedDate
        value={new Date(forecast.dt * 1000)}
        weekday="long"
        hour="numeric"
        minute="numeric"
      />
      <hr />
    </div>
  ));
  return <div>{listItems}</div>;
}

ForecastCards.propTypes = {
  forecasts: PropTypes.array.isRequired,
};

export default ForecastCards;
