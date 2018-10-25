import { fromJS } from 'immutable';
import forecastContainerReducer from '../reducer';

describe('forecastContainerReducer', () => {
  it('returns the initial state', () => {
    expect(forecastContainerReducer(undefined, {})).toEqual(fromJS({}));
  });
});
