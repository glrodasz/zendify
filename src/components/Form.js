import React, { Component, PropTypes } from 'react';

class Form extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form className="form form--sucess" onSubmit={handleSubmit}>
        <div className="form__group">
          <label className="form__label" htmlFor="name">Name</label>
          <input className="form__control" id="name" type="text" placeholder="Name" required autoFocus />
        </div>
        <div className="form__group">
          <label className="form__label" htmlFor="email">Email</label>
          <input className="form__control" id="email" type="email" placeholder="Email" required />
        </div>
        <div className="form__group">
          <label className="form__label" htmlFor="subject">Subject</label>
          <input className="form__control" id="subject" type="text" placeholder="Subject" required />
        </div>
        <div className="form__group">
          <label className="form__label" htmlFor="message">Message</label>
          <textarea className="form__control" id="message" cols="30" rows="8" required />
        </div>
        <button className="button button--block button--sucess form__submit" type="submit">Enviar</button>
      </form>
    );
  }
}

export default Form;
