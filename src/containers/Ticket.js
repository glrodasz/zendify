import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Form from '../components/Form';
import { submitTicket } from '../actions';

const Ticket = (props) => (
  <div className="ticket">
    <h2 className="ticket__title">Write your Zendesk ticket</h2>
    <Form {...props} />
  </div>
);

Ticket.propTypes = {
  isLoading: PropTypes.bool,
  showError: PropTypes.bool,
  responseMessage: PropTypes.object,
};

const mapStateToProps = ({
  isLoading,
  showError,
  successResponse,
  errorResponse,
}) => ({
  isLoading,
  showError,
  responseMessage: showError ? errorResponse : successResponse,
});

export default connect(mapStateToProps, { submitTicket })(Ticket);
