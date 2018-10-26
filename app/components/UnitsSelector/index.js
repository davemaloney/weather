/**
 *
 * UnitsSelect
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

function UnitsSelector(props) {
  const { unitsSelect, handleToggle } = props;
  return (
    <div>
      <div className="radio">
        <label>
          <input
            type="radio"
            name="unitGroup"
            value="imperial"
            defaultChecked={unitsSelect === 'imperial'}
            onClick={handleToggle}
          />
          &deg; F
        </label>
      </div>
      <div className="radio">
        <label>
          <input
            type="radio"
            name="unitGroup"
            value="metric"
            defaultChecked={unitsSelect === 'metric'}
            onClick={handleToggle}
          />
          &deg; C
        </label>
      </div>
    </div>
  );
}

UnitsSelector.propTypes = {
  unitsSelect: PropTypes.string.isRequired,
  handleToggle: PropTypes.func.isRequired,
};

export default UnitsSelector;
