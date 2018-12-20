import React from 'react';
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/"><h1>randoFont</h1></Link>
      <Link to="/favorites" className="navbar-link">Favorites</Link>
    </div>
  )
}

export default Navbar;
