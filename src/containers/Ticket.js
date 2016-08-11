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
  responseMessage: PropTypes.string,
  showError: PropTypes.bool,
};

const mapStateToProps = ({
  isLoading,
  showError,
  clearForm,
  successResponse,
  errorResponse,
}) => ({
  isLoading,
  showError,
  clearForm,
  responseMessage: showError ? errorResponse : successResponse,
});

export default connect(mapStateToProps, { submitTicket })(Ticket);
