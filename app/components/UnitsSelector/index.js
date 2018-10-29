/**
 *
 * UnitsSelect
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import { Label, Input } from 'reactstrap';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

function UnitsSelector(props) {
  const { unitsSelect, handleToggle } = props;
  return (
    <div className="btn-group btn-group-toggle">
      <Label
        className={`btn ${
          unitsSelect === 'imperial' ? 'btn-dark' : 'btn-light'
        }`}
      >
        <Input
          type="radio"
          name="unitGroup"
          id="fahrenheit"
          value="imperial"
          defaultChecked={unitsSelect === 'imperial'}
          onClick={handleToggle}
        />
        &deg; F
      </Label>
      <Label
        className={`btn ${unitsSelect === 'metric' ? 'btn-dark' : 'btn-light'}`}
      >
        <Input
          type="radio"
          name="unitGroup"
          id="celcius"
          value="metric"
          defaultChecked={unitsSelect === 'metric'}
          onClick={handleToggle}
        />
        &deg; C
      </Label>
    </div>
  );
}

UnitsSelector.propTypes = {
  unitsSelect: PropTypes.string.isRequired,
  handleToggle: PropTypes.func.isRequired,
};

export default UnitsSelector;
