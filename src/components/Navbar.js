import React from 'react';
import { Link, Route } from 'react-router-dom';

import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Typography, Tabs, Tab } from '@material-ui/core';

import NavbarFavCount from './NavbarFavCount';

const useStyles = makeStyles({
  title: {
    fontWeight: '700',
    position: 'relative',
    top: '-2px',
  },
  navLink: {
    textTransform: 'capitalize',
    '& span': {
      color: 'black',
    },
  },
});

const getRouteIndex = route => {
  switch (route) {
    case "RandomFonts": return 0;
    case "FavoriteFonts": return 1;
    default: return null;
  }
}

const Navbar = ({ route }) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <Typography variant="h4" color="inherit" className={ classes.title }>
            randoFont
          </Typography>
          <Tabs value={getRouteIndex(route)}>
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