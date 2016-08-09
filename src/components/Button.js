import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

class Button extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    text: PropTypes.string,
    className: PropTypes.string,
    type: PropTypes.string,
  }

  constructor(props) {
    super(props);

    this.renderLoading = this.renderLoading.bind(this);
    this.getClasses = this.getClasses.bind(this);
  }

  getClasses() {
    const { className, type } = this.props;

    return classnames('button', className, {
      'button--success': type === 'success',
      'button--error': type === 'error',
    });
  }

  renderLoading() {
    return (
      <div className="spinner">
        <div className="bounce1" />
        <div className="bounce2" />
        <div className="bounce3" />
      </div>
    );
  }

  render() {
    const { isLoading, text } = this.props;

    return (
      <button className={this.getClasses()} type="submit">{isLoading ? this.renderLoading() : text}</button>
    );
  }

}

export default Button;
