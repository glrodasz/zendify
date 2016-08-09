import React, { Component, PropTypes, findDOMNode } from 'react';

class Form extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    const data = {
      name: findDOMNode(this.refs.fullname).value,
      email: findDOMNode(this.refs.email).value,
      subject: findDOMNode(this.refs.subject).value,
      message: findDOMNode(this.refs.message).value,
    };

    this.props.handleSubmit(data);
  }

  render() {
    return (
      <form className="form form--sucess" onSubmit={this.onSubmit}>
        <div className="form__group">
          <label className="form__label" htmlFor="fullname">Name</label>
          <input className="form__control" ref="fullname" type="text" placeholder="Name" required autoFocus />
        </div>
        <div className="form__group">
          <label className="form__label" htmlFor="email">Email</label>
          <input className="form__control" ref="email" type="email" placeholder="Email" required />
        </div>
        <div className="form__group">
          <label className="form__label" htmlFor="subject">Subject</label>
          <input className="form__control" ref="subject" type="text" placeholder="Subject" required />
        </div>
        <div className="form__group">
          <label className="form__label" htmlFor="message">Message</label>
          <textarea className="form__control" ref="message" cols="30" rows="5" required />
        </div>
        <button className="button button--block button--sucess form__submit" type="submit">Enviar</button>
      </form>
    );
  }
}

export default Form;
