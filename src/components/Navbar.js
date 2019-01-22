import React from 'react';
import { Link, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import NavbarFavCount from './NavbarFavCount';

const Navbar = props => {
  const { showNavbar } = props;

  const navigation = showNavbar ?
    <React.Fragment>
      <NavbarLink to="/" label="Home" />
      <NavbarLink to="/favorites" label="Favorites" />
      <NavbarFavCount/>
    </React.Fragment> :
    null;

  return (
    <div className="navbar">
      <h1>randoFont</h1>
      { navigation }
    </div>
  )
}

const NavbarLink = ({ to, label, ...rest }) => (
  <Route path= {to} exact children={({ match }) => (
    <Link
      className={match ? "navbar-link-active" : "navbar-link"}
      to={to} >{label}</Link>
  )} />
)

Navbar.propTypes = {
  showNavbar: PropTypes.bool.isRequired
};

const mapStatetoProps = state => ({
  showNavbar: (state.fonts.favoriteFonts.length > 0)
});

export default connect(mapStatetoProps, null)(Navbar);