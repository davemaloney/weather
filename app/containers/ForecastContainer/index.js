/**
 *
 * ForecastContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Container } from 'reactstrap';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import makeSelectForecastContainer from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getByCoords, getWeather } from './actions';
import styles from './styles.less';

import Forecast from '../../components/Forecast';
import CitySelect from '../../components/CitySelect';
import UnitsSelector from '../../components/UnitsSelector';
import Message from '../../components/Message';
import Chart from '../../components/Chart';

/* eslint-disable react/prefer-stateless-function */
export class ForecastContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityInput: this.props.city,
      unitsSelect: this.props.units,
    };
  }

  static propTypes = {
    getByCoords: PropTypes.func.isRequired,
    getWeather: PropTypes.func.isRequired,
    weather: PropTypes.bool.isRequired,
    timezone: PropTypes.string.isRequired,
    timezoneOffset: PropTypes.number.isRequired,
    location: PropTypes.shape({
      lat: PropTypes.number,
      lon: PropTypes.number,
    }),
    city: PropTypes.string,
    units: PropTypes.string,
    message: PropTypes.string,
    data: PropTypes.shape({
      city: PropTypes.object,
      cod: PropTypes.string,
      list: PropTypes.array,
    }),
  };

  componentDidMount() {
    // this.props.getWeather(this.props.city, this.props.units);
  }

  handleUserInputChange = event => {
    this.setState({
      cityInput: event.target.value,
    });
  };

  handleSubmit = event => {
    this.props.getWeather(this.state.cityInput, this.state.unitsSelect);
    event.preventDefault();
  };

  handleToggle = event => {
    const newUnit = event.target.value;
    this.setState({
      unitsSelect: newUnit,
    });
    if (this.props.location) {
      this.props.getByCoords(this.props.location, newUnit);
    } else {
      this.props.getWeather(this.state.cityInput, newUnit);
    }
  };

  getPosition = () =>
    new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

  handlePosition = () => {
    const { units } = this.props;
    this.getPosition()
      .then(position => {
        const newLocation = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };
        this.props.getByCoords(newLocation, units);
      })
      .catch(err => {
        // TODO: This needs better error handling
        console.error(err.message);
      });
  };

  render() {
    const { cityInput, unitsSelect } = this.state;
    return (
      <div>
        <Container>
          <Message message={this.props.message} />
          <div className={styles.forecastHeader}>
            <CitySelect
              cityInput={cityInput}
              onUserInputChange={this.handleUserInputChange}
              handleSubmit={this.handleSubmit}
              handlePosition={this.handlePosition}
            />
            <UnitsSelector
              unitsSelect={unitsSelect}
              handleToggle={this.handleToggle}
            />
          </div>
        </Container>
        <Chart
          timezoneOffset={this.props.timezoneOffset}
          weather={this.props.weather}
          data={this.props.data}
        />
        <Forecast
          timezone={this.props.timezone}
          weather={this.props.weather}
          data={this.props.data}
        />
      </div>
    );
  }
}

const mapStateToProps = makeSelectForecastContainer();

function mapDispatchToProps(dispatch) {
  return {
    getByCoords: (location, units) => dispatch(getByCoords(location, units)),
    getWeather: (city, units) => dispatch(getWeather(city, units)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'forecastContainer', reducer });
const withSaga = injectSaga({ key: 'forecastContainer', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ForecastContainer);
