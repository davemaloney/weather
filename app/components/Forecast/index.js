/**
 *
 * Forecast
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import ForecastCards from '../ForecastCards';

function Forecast(props) {
  return (
    <div>
      {props.weather ? (
        <div>
          <h1>{props.data.city.name}</h1>
          <ForecastCards forecasts={props.data.list} />
        </div>
      ) : (
        <FormattedMessage {...messages.error} />
      )}
    </div>
  );
}

Forecast.propTypes = {
  weather: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired,
};

export default Forecast;
