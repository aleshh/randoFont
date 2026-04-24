import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Typography, Tabs, Tab } from '@material-ui/core';

import NavbarFavCount from './NavbarFavCount';

const useStyles = makeStyles(theme => ({
  toolbar: {
    gap: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      minHeight: 56,
      gap: theme.spacing(1),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
  },
  title: {
    fontWeight: '700',
    position: 'relative',
    top: '-2px',
    whiteSpace: 'nowrap',
    [theme.breakpoints.down('xs')]: {
      fontSize: 'clamp(1.65rem, 8vw, 2rem)',
      lineHeight: 1.1,
    },
  },
  tabs: {
    marginLeft: 'auto',
    minHeight: 48,
    [theme.breakpoints.down('xs')]: {
      minHeight: 44,
    },
  },
  navLink: {
    textTransform: 'capitalize',
    width: 'calc(15vw + 40px)',
    maxWidth: 200,
    minWidth: 88,
    [theme.breakpoints.down('xs')]: {
      minWidth: 54,
      width: 'auto',
      paddingLeft: theme.spacing(0.75),
      paddingRight: theme.spacing(0.75),
      fontSize: '0.78rem',
    },
    '& span': {
      color: 'black',
    },
  },
}));

const getRouteIndex = () => {
  switch (window.location.pathname) {
    case "/": return 0;
    case "/favorites": return 1;
    default: return null;
  }
}

const Navbar = () => {
  const classes = useStyles();

  const favText = <span>Favorites <NavbarFavCount/></span>

  return (
    <React.Fragment>
      <AppBar position="fixed" color="primary">
        <Toolbar className={classes.toolbar}>
          <Typography variant="h4" color="inherit" className={ classes.title }>
            randoFont
          </Typography>
          <Tabs value={getRouteIndex()} className={classes.tabs}>
            <Tab className={ classes.navLink } label="Home" href="/" />
            <Tab className={ classes.navLink } label={favText} href="/favorites" />
          </Tabs>
        </Toolbar>
      </AppBar>
      <Toolbar></Toolbar>
    </React.Fragment>
  );
};

export default Navbar;
