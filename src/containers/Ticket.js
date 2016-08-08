import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from '../components/Form';

class Ticket extends Component {
  render() {
    return (
      <div className="ticket">
        <h2 className="ticket__title">Write your Zendesk ticket</h2>
        <Form handleSubmit={() => {}} />
      </div>
    );
  }
}

export default connect()(Ticket);
