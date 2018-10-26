/**
 *
 * Message
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

function Message(props) {
  if (props.message) {
    return <div>{props.message}</div>;
  }
  return null;
}

Message.propTypes = {
  message: PropTypes.string,
};

export default Message;
