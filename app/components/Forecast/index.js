/**
 *
 * Forecast
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { Container } from 'reactstrap';

import styles from './styles.less';
import messages from './messages';
import countries from './countries';

import ForecastCards from '../ForecastCards';

function Forecast(props) {
  return (
    <div className={styles.forecastWrapper}>
      <Container>
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
          <div className="text-center">
            <FormattedMessage {...messages.loading} />
          </div>
        )}
      </Container>
    </div>
  );
}

Forecast.propTypes = {
  weather: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired,
};

export default Forecast;
