import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Typography, Tabs, Tab } from '@material-ui/core';

import NavbarFavCount from './NavbarFavCount';

const useStyles = makeStyles({
  title: {
    fontWeight: '700',
    position: 'relative',
    top: '-2px',
    marginRight: 25,
  },
  navLink: {
    textTransform: 'capitalize',
    '& span': {
      color: 'black',
    },
  },
});

const getRouteIndex = () => {
  switch (window.location.pathname) {
    case "/": return 0;
    case "/favorites": return 1;
    default: return null;
  }
}

const Navbar = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <Typography variant="h4" color="inherit" className={ classes.title }>
            randoFont
          </Typography>
          <Tabs value={getRouteIndex()}>
            <Tab className={ classes.navLink } label="Home" href="/" />
            <Tab className={ classes.navLink } label="Favorites" href="/favorites" />
            <NavbarFavCount/>
          </Tabs>
        </Toolbar>
      </AppBar>
      <Toolbar></Toolbar>
    </React.Fragment>
  );
};

export default Navbar;