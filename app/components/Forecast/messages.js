/*
 * Forecast Messages
 *
 * This contains all the text for the Forecast component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.Forecast';

export default defineMessages({
  error: {
    id: `${scope}.header`,
    defaultMessage: 'Error: Weather data could not be accessed.',
  },
});
