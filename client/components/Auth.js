import React, { PropTypes } from 'react';
import Button from './Button';

const Auth = ({ login, logout, isAuthenticated, profile }) => (
  <div className="auth">
    { !isAuthenticated ? (
      <div className="auth__container">
        <Button
          className="auth__button"
          text="Login"
          type="success"
          handleClick={login}
        />
      </div>
    ) : (
      <div className="auth__container">
        <div className="auth__badge">
          <img
            className="auth__image"
            src={profile.picture}
            alt={profile.nickname}
          />
          <span className="auth__name">Welcome, {profile.nickname}!</span>
        </div>
        <Button
          className="auth__button"
          text="Logout"
          type="error"
          handleClick={logout}
        />
      </div>
    )}
  </div>
);

Auth.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  profile: PropTypes.object,
};

export default Auth;
