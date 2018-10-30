/**
 *
 * CitySelect
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
class CitySelect extends React.Component {
  render() {
    const {
      cityInput,
      onUserInputChange,
      handleSubmit,
      handlePosition,
    } = this.props;
    return (
      <Form inline onSubmit={handleSubmit}>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label className="mr-sm-2" size="lg" for="cityInput">
            <FormattedMessage {...messages.inputLabel} />{' '}
          </Label>
          <Input
            placeholder="e.g. New York"
            type="text"
            bsSize="lg"
            id="cityInput"
            name="cityInput"
            value={cityInput}
            onChange={onUserInputChange}
          />
        </FormGroup>
        <Input
          className="btn btn-lg btn-primary mr-sm-2"
          bsSize="lg"
          type="submit"
          value="Submit"
        />
        <Button
          outline
          color="primary"
          size="lg"
          type="button"
          onClick={handlePosition}
        >
          Current Location
        </Button>
      </Form>
    );
  }
}

CitySelect.propTypes = {};

export default CitySelect;
