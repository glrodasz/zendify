import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

class Button extends Component {
  static propTypes = {
    className: PropTypes.string,
    isLoading: PropTypes.bool,
    text: PropTypes.string,
    type: PropTypes.string,
    isSubmit: PropTypes.bool,
    isDisabled: PropTypes.bool,
    handleClick: PropTypes.func,
  }

  static defaultProps = {
    isLoading: false,
    isDisabled: false,
  };

  constructor(props) {
    super(props);

    this.renderLoading = this.renderLoading.bind(this);
    this.getClasses = this.getClasses.bind(this);
  }

  getClasses({ isLoading, className, type }) {
    return classNames('button', className, {
      'button--success': !isLoading && type === 'success',
      'button--error': !isLoading && type === 'error',
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
    const { isLoading, isDisabled, text, isSubmit, handleClick } = this.props;

    return (
      <button
        className={this.getClasses(this.props)}
        type={isSubmit ? 'submit' : 'button'}
        disabled={isLoading || isDisabled}
        onClick={handleClick}
      >
        {isLoading ? this.renderLoading() : text}
      </button>
    );
  }
}

export default Button;
