import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the forecastContainer state domain
 */

const selectForecastContainerDomain = state =>
  state.get('forecastContainer', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ForecastContainer
 */

const makeSelectForecastContainer = () =>
  createSelector(selectForecastContainerDomain, substate => substate.toJS());

export default makeSelectForecastContainer;
export { selectForecastContainerDomain };
