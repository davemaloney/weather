/**
 *
 * ForecastCards
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
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
      {forecast.dt_txt}
      <hr />
    </div>
  ));
  return <div>{listItems}</div>;
}

ForecastCards.propTypes = {
  forecasts: PropTypes.array.isRequired,
};

export default ForecastCards;
