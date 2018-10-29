/**
 *
 * Message
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

function Message(props) {
  if (props.message) {
    return (
      <Alert color="warning" className="text-center text-capitalize">
        {props.message}
      </Alert>
    );
  }
  return null;
}

Message.propTypes = {
  message: PropTypes.string,
};

export default Message;
