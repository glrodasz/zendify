import React from 'react';
import { connect } from 'react-redux';
import { login, logout } from '../actions';
import Auth from '../components/Auth';

const Navbar = (props) => (
  <div className="navbar">
    <Auth {...props} />
  </div>
);

const mapStateToProps = ({ auth: { isAuthenticated, profile } }) => ({
  isAuthenticated,
  profile,
});

export default connect(mapStateToProps, { login, logout })(Navbar);
