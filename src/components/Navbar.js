import React from 'react';
import { Link, Route } from 'react-router-dom';

import { makeStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

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

const Navbar = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <Typography variant="h4" color="inherit" className={ classes.title }>
            randoFont
          </Typography>
          <Tabs>
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