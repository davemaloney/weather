/**
 *
 * Forecast
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Helmet } from 'react-helmet';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import countries from './countries';

import ForecastCards from '../ForecastCards';

function Forecast(props) {
  return (
    <div>
      {props.weather ? (
        <div>
          <Helmet>
            <title>{props.data.city.name} Weather Forecast</title>
          </Helmet>

          <h1>
            {props.data.city.name}, {countries[props.data.city.country]}
          </h1>
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
