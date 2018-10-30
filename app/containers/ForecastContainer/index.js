/**
 *
 * ForecastContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Container } from 'reactstrap';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectForecastContainer from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getByCoords, getWeather } from './actions';

import Forecast from '../../components/Forecast';
import CitySelect from '../../components/CitySelect';
import UnitsSelector from '../../components/UnitsSelector';
import Message from '../../components/Message';

/* eslint-disable react/prefer-stateless-function */
export class ForecastContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: this.props.location,
      cityInput: this.props.city,
      unitsSelect: this.props.units,
    };
  }

  static propTypes = {
    getByCoords: PropTypes.func.isRequired,
    getWeather: PropTypes.func.isRequired,
    children: PropTypes.element,
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
        this.setState({
          location: newLocation,
        });
        this.props.getByCoords(newLocation, units);
      })
      .catch(err => {
        // TODO: This needs better error handling
        console.error(err.message);
      });
  };

  render() {
    const { cityInput, unitsSelect, location } = this.state;
    return (
      <div>
        <Container>
          <Message message={this.props.message} />
          <CitySelect
            cityInput={cityInput}
            unitsSelect={unitsSelect}
            location={location}
            onUserInputChange={this.handleUserInputChange}
            handleSubmit={this.handleSubmit}
            handlePosition={this.handlePosition}
            getPosition={this.getPosition}
          />
          <UnitsSelector
            unitsSelect={unitsSelect}
            handleToggle={this.handleToggle}
          />
        </Container>
        <Forecast {...this.props} />
      </div>
    );
  }
}

// ForecastContainer.propTypes = {
//   dispatch: PropTypes.func.isRequired,
// };

// const mapStateToProps = createStructuredSelector({
//   forecastContainer: makeSelectForecastContainer(),
// });

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
