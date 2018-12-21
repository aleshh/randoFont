import React from 'react';
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="navbar">
      <h1>randoFont</h1>
      <Link className="navbar-link" to="/" >Home</Link>
      <Link className="navbar-link" to="/favorites" >Favorites</Link>
    </div>
  )
}

export default Navbar;
