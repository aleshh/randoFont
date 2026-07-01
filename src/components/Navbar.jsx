import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { Heart, Home } from 'lucide-react';

import Controls from './Controls';
import NavbarFavCount from './NavbarFavCount';

const Navbar = ({ favoriteCount }) => {
  const location = useLocation();
  const showControls = location.pathname !== '/favorites';
  const showNav = favoriteCount > 0 || location.pathname === '/favorites';

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <div className="brand">randoFont</div>
        {showControls && <Controls />}
        {showNav && (
          <nav className="site-nav" aria-label="Primary">
            <NavLink exact className="nav-link" activeClassName="nav-link-active" to="/" title="Home" aria-label="Home">
              <Home className="nav-icon" size={17} aria-hidden="true" />
              <span className="nav-label">Home</span>
            </NavLink>
            <NavLink className="nav-link" activeClassName="nav-link-active" to="/favorites" title="Favorites" aria-label="Favorites">
              <Heart className="nav-icon" size={17} aria-hidden="true" />
              <span className="nav-label">Favorites</span>
              <NavbarFavCount/>
            </NavLink>
          </nav>
        )}
      </div>
    </header>
  );
};

Navbar.propTypes = {
  favoriteCount: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  favoriteCount: state.fonts.favoriteFonts.length
});

export default connect(mapStateToProps)(Navbar);
