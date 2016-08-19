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

const mapStateToProps = ({
  ticket: {
    isLoading,
    showError,
    successResponse,
    errorResponse,
  },
  form: { isFulfilled },
  auth: {
    isAuthenticated,
    profile: { email, name },
  },
}) => ({
  isLoading,
  showError,
  isFulfilled,
  isAuthenticated,
  agentEmail: email,
  agentName: name,
  responseMessage: showError ? errorResponse : successResponse,
});

export default connect(mapStateToProps, { submit, reset })(Ticket);
