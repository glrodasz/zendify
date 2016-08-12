import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Form from '../components/Form';
import { submitTicket, resetForm } from '../actions';

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

const mapStateToProps = ({ ticket, form }) => {
  const { isLoading, showError, successResponse, errorResponse } = ticket;
  const { isFulfilled } = form;

  return {
    isLoading,
    showError,
    isFulfilled,
    responseMessage: showError ? errorResponse : successResponse,
  };
};

export default connect(mapStateToProps, { submitTicket, resetForm })(Ticket);
