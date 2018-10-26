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

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectForecastContainer from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getWeather } from './actions';

import Forecast from '../../components/Forecast';
import CitySelect from '../../components/CitySelect';
import UnitsSelector from '../../components/UnitsSelector';

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
    getWeather: PropTypes.func.isRequired,
    children: PropTypes.element,
  };

  componentDidMount() {
    this.props.getWeather(this.props.city, this.props.units);
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
    this.props.getWeather(this.state.cityInput, newUnit);
  };

  render() {
    const { cityInput, unitsSelect } = this.state;
    return (
      <div>
        {this.props.message && <div>{this.props.message}</div>}
        <CitySelect
          cityInput={cityInput}
          onUserInputChange={this.handleUserInputChange}
          handleSubmit={this.handleSubmit}
        />
        <UnitsSelector
          unitsSelect={unitsSelect}
          handleToggle={this.handleToggle}
        />
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
