import React from 'react';
import { connect } from 'react-redux';
import Form from '../components/Form';
import { submit, reset } from '../actions';

const Ticket = (props) => (
  <div className="ticket">
    <h2 className="ticket__title">Write your Zendesk ticket</h2>
    <Form {...props} />
  </div>
);

const mapStateToProps = ({ ticket, form, auth: { isAuthenticated } }) => {
  const { isLoading, showError, successResponse, errorResponse } = ticket;
  const { isFulfilled } = form;

  return {
    isLoading,
    showError,
    isFulfilled,
    isAuthenticated,
    responseMessage: showError ? errorResponse : successResponse,
  };
};

export default connect(mapStateToProps, { submit, reset })(Ticket);
