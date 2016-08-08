import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from '../components/Form';

class FormContainer extends Component {
  render() {
    return (
      <Form />
    );
  }
}

export default connect()(FormContainer);
