import React from 'react';
import { Link, Route } from 'react-router-dom';

import NavbarFavCount from './NavbarFavCount';

const Navbar = () => {
  return (
    <div className="navbar">
      <h1>randoFont</h1>
      <NavbarLink to="/" label="Home" />
      <NavbarLink to="/favorites" label="Favorites" />
      <NavbarFavCount/>
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

export default Navbar;