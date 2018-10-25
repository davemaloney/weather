/**
 *
 * CitySelect
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
class CitySelect extends React.Component {
  render() {
    const { cityInput, onUserInputChange, handleSubmit } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            <FormattedMessage {...messages.inputLabel} />
            <input type="text" value={cityInput} onChange={onUserInputChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

CitySelect.propTypes = {};

export default CitySelect;
