import React from 'react';
import { Link, Route } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import NavbarFavCount from './NavbarFavCount';

const Navbar = () => {
  return (
    <React.Fragment>
      <AppBar position="fixed" color="default">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            randoFont
          </Typography>
          <Tabs>
            <Tab label="Home" href="/" />
            <Tab label="Favorites" href="/favorites" />
          </Tabs>
        </Toolbar>
      </AppBar>
      <Toolbar></Toolbar>
    </React.Fragment>
  )

  // return (
  //   <div className="navbar">
  //     <h1>randoFont</h1>
  //     <NavbarLink to="/" label="Home" />
  //     <NavbarLink to="/favorites" label="Favorites" />
  //     <NavbarFavCount/>
  //   </div>
  // )
}

const NavbarLink = ({ to, label, ...rest }) => (
  <Route path= {to} exact children={({ match }) => (
    <Link
      className={match ? "navbar-link-active" : "navbar-link"}
      to={to} >{label}</Link>
  )} />
)

export default Navbar;