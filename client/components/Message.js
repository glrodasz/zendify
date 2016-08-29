import React, { PropTypes } from 'react';
import classNames from 'classnames';

const Message = ({ text, showError }) => {
  const formattedText = showError ? `✗ ${text}` : `✓ ${text}`;

  return (
    <div
      className={classNames('message', {
        'message--error': showError,
        'message--success': text,
      })}
    >
      { text ? formattedText : ''}
    </div>
  );
};


Message.propTypes = {
  showError: PropTypes.bool,
  text: PropTypes.string,
};

Message.defaultProps = {
  text: '',
  showError: false,
};

export default Message;
