/**
 *
 * CitySelect
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { FormattedMessage } from 'react-intl';

import messages from './messages';

function CitySelect(props) {
  const { cityInput, onUserInputChange, handleSubmit, handlePosition } = props;
  return (
    <Form inline onSubmit={handleSubmit}>
      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
        <Label className="mb-2 mb-sm-0 mr-sm-2" size="lg" for="cityInput">
          <FormattedMessage {...messages.inputLabel} />{' '}
        </Label>
        <Input
          className="form-control"
          placeholder={messages.inputPlaceholder.defaultMessage}
          type="text"
          bsSize="lg"
          id="cityInput"
          name="cityInput"
          value={cityInput}
          onChange={onUserInputChange}
        />
      </FormGroup>
      <Input
        className="btn btn-lg btn-primary mb-2 mb-sm-0 mr-sm-2"
        bsSize="lg"
        type="submit"
        value={messages.submitLabel.defaultMessage}
      />
      <Button
        className="mb-2 mb-sm-0"
        outline
        color="primary"
        size="lg"
        type="button"
        onClick={handlePosition}
      >
        {messages.currentLocation.defaultMessage}
      </Button>
    </Form>
  );
}

CitySelect.propTypes = {
  cityInput: PropTypes.string.isRequired,
  onUserInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handlePosition: PropTypes.func.isRequired,
};

export default CitySelect;
