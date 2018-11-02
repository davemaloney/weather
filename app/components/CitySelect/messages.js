/*
 * CitySelect Messages
 *
 * This contains all the text for the CitySelect component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.CitySelect';

export default defineMessages({
  inputLabel: {
    id: `${scope}.inputLabel`,
    defaultMessage: 'Place name:',
  },
  inputPlaceholder: {
    id: `${scope}.inputPlaceholder`,
    defaultMessage: 'e.g. New York',
  },
  submitLabel: {
    id: `${scope}.submitLabel`,
    defaultMessage: 'Submit',
  },
  currentLocation: {
    id: `${scope}.currentLocation`,
    defaultMessage: 'Current Location',
  },
});
