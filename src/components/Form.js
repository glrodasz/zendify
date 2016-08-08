import React, { Component, PropTypes } from 'react';

class Form extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <input type="text" placehoder="Name" />
      </form>
    );
  }
}

export default Form;
