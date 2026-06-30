import React from 'react';
import { NavLink } from 'react-router-dom';

import NavbarFavCount from './NavbarFavCount';

const Navbar = () => {
  const favText = <span>Favorites <NavbarFavCount/></span>

  return (
    <React.Fragment>
      <header className="site-header">
        <div className="site-header-inner">
          <div className="brand">randoFont</div>
          <nav className="site-nav" aria-label="Primary">
            <NavLink exact className="nav-link" activeClassName="nav-link-active" to="/">Home</NavLink>
            <NavLink className="nav-link" activeClassName="nav-link-active" to="/favorites">{favText}</NavLink>
          </nav>
        </div>
      </header>
      <div className="site-header-spacer"></div>
    </React.Fragment>
  );
};

export default Navbar;
