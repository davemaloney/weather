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

function Forecast(props) {
  return (
    <div>
      {props.weather ? (
        <h1>{props.data.city.name}</h1>
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
