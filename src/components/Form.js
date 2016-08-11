import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import Joi from 'joi';
import validation from 'react-validation-mixin';
import strategy from 'joi-validation-strategy';
import classNames from 'classnames';
import Button from './Button';
import Message from './Message';

class Form extends Component {
  static propTypes = {
    clearForm: PropTypes.bool,
    getValidationMessages: PropTypes.func,
    handleValidation: PropTypes.func,
    isLoading: PropTypes.bool,
    isValid: PropTypes.func,
    responseMessage: PropTypes.string,
    showError: PropTypes.bool,
    submitTicket: PropTypes.func.isRequired,
    validate: PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.validatorTypes = {
      name: Joi.string().required().label('Customer\'s name'),
      email: Joi.string().email().required().label('Customer\'s email'),
      subject: Joi.string().required().label('Ticket\'s subject'),
      message: Joi.string().required().label('Ticket\'s message'),
    };

    this.getValidatorData = this.getValidatorData.bind(this);
    this.renderHelpText = this.renderHelpText.bind(this);
    this.getClasses = this.getClasses.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.inputsRefs = Object.keys(this.refs);
  }

  onSubmit(event) {
    event.preventDefault();

    const onValidate = error => {
      if (!error) {
        this.props.submitTicket(this.getFormData());
      }
    };

    this.props.validate(onValidate);
  }

  getClasses(field) {
    return classNames({
      form__group: true,
      'form__group--error': !this.props.isValid(field),
    });
  }

  getFormData() {
    return this.inputsRefs.reduce((accumulator, current) => {
      return Object.assign({}, accumulator, {
        [current]: findDOMNode(this.refs[current]).value,
      });
    }, {});
  }

  getValidatorData() {
    return this.getFormData();
  }

  clearFormData() {
    this.inputsRefs.forEach(current => {
      findDOMNode(this.refs[current]).value = '';
    });
  }

  renderHelpText(message) {
    return (
      <span className="form__help-block">
        {message && message.length ? `${message.join(', ')}.` : ''}
      </span>
    );
  }

  render() {
    const { isLoading, showError, responseMessage } = this.props;

    const className = classNames('form', 'form--success', {
      'form--loading': isLoading,
    });

    return (
      <form className={className} onSubmit={this.onSubmit} noValidate>
        <div className={this.getClasses('name')}>
          <label className="form__label" htmlFor="name">Name</label>
          <input
            className="form__control"
            ref="name"
            type="text"
            placeholder="Customer's name"
            required
            autoFocus
            onBlur={this.props.handleValidation('name')}
          />
          {this.renderHelpText(this.props.getValidationMessages('name'))}
        </div>
        <div className={this.getClasses('email')}>
          <label className="form__label" htmlFor="email">Email</label>
          <input
            className="form__control"
            ref="email"
            type="email"
            placeholder="Customer's email"
            required
            onBlur={this.props.handleValidation('email')}
          />
          {this.renderHelpText(this.props.getValidationMessages('email'))}
        </div>
        <div className={this.getClasses('subject')}>
          <label className="form__label" htmlFor="subject">Subject</label>
          <input
            className="form__control"
            ref="subject"
            type="text"
            placeholder="Ticket's subject"
            required
            onBlur={this.props.handleValidation('subject')}
          />
          {this.renderHelpText(this.props.getValidationMessages('subject'))}
        </div>
        <div className={this.getClasses('message')}>
          <label className="form__label" htmlFor="message">Message</label>
          <textarea
            className="form__control"
            ref="message"
            cols="30"
            rows="5"
            placeholder="Ticket's message"
            required
            onBlur={this.props.handleValidation('message')}
          />
          {this.renderHelpText(this.props.getValidationMessages('message'))}
        </div>
        <Button
          isLoading={isLoading}
          text={showError ? 'Try again' : 'Send'}
          type={showError ? 'error' : 'success'}
          className="form__submit"
        />
        <Message
          text={responseMessage}
          showError={showError}
        />
      </form>
    );
  }
}

export default validation(strategy)(Form);
