/*
 * Forecast Messages
 *
 * This contains all the text for the Forecast component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.Forecast';

export default defineMessages({
  loading: {
    id: `${scope}.header`,
    defaultMessage:
      'Please select a location for the weather forecast. Search by name or US zip code.',
  },
});
