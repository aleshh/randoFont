import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/styles'
import {
  AppBar, Toolbar, FormControl, Select, MenuItem, Button
} from '@material-ui/core';

import CheckboxInput from './CheckboxInput';

import {
  toggleCategoryWanted,
  setFontCount,
  fetchFonts,
  setRandomFonts,
  setCurrentlyViewedFonts,
  invertCategories
} from '../actions/fontActions';

const styles = theme => ({
  root: {
    marginTop: '64px',
    boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2)',
    borderTop: '1px solid gray',
    [theme.breakpoints.down('xs')]: {
      marginTop: '48px',
    },
  },
  formElement: {
    marginRight: 40,
    [theme.breakpoints.down('sm')]: {
      marginRight: 10,
      fontSize: 13,
      '& .MuiFormControlLabel-label': {
        fontSize: 13,
      }
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: 9,
      '& .MuiFormControlLabel-label': {
        fontSize: 9,
      }
    },
  },
  qty: {
    [theme.breakpoints.down('sm')]: {
      fontSize: 13,
      '& .MuiFormControlLabel-label': {
        fontSize: 13,
      }
    },
  },
});

class Controls extends Component {

  componentWillMount() {
    if (this.props.allFonts.length === 0) {
      // on initial app loal
      this.props.fetchFonts();
    } else {
      //if we're returning from Favorites, refresh random fonts
      this.randomizeFonts();
    }
  }

  componentDidUpdate() {
    if (this.props.randomFonts.length === 0) {
      this.randomizeFonts();
    }
  }

  randomizeFonts = () => {
    const { categoriesWanted, fontCount, allFonts } = this.props;
    let eligibleFonts = [];

    if (allFonts.length === 0) return;
    if (categoriesWanted.length === 0) return;

    // Eligibile fonts are those that meet our categories and are not already
    // favorites
    allFonts.forEach(font => {
      if (categoriesWanted.includes(font.category) &&
      (font.subsets.includes('latin') ||
      font.subsets.includes('latin-ext')) &&
      !this.props.favoriteFonts.includes(font)) {
        eligibleFonts.push(font);
      }
    });

    const fontQty = (eligibleFonts.length < fontCount)
      ? eligibleFonts.length
      : fontCount;

    // Use Fisher–Yates shuffle, but only for as many elements as we need
    for (let i = eligibleFonts.length;
         i > (eligibleFonts.length - fontQty);
         i--) {
      const r = Math.floor(Math.random() * (eligibleFonts.length - 1));
      const current = eligibleFonts[i - 1];

      eligibleFonts[i - 1] = eligibleFonts[r];
      eligibleFonts[r] = current;
    }

    const randomFonts = eligibleFonts.splice(-fontQty);

    this.props.setRandomFonts(randomFonts);
    this.props.setCurrentlyViewedFonts(randomFonts);
  }

  render() {
    const {
      fontCount,
      categoriesWanted,
      toggleCategoryWanted,
      setFontCount,
      invertCategories
    } = this.props;
    const categories = [
      'serif', 'sans-serif', 'display', 'handwriting', 'monospace'
    ];
    const quantityOptions = [1, 3, 6, 12, 24, 48];

    return (
      <React.Fragment>
        <AppBar position="fixed" color="primary" className={this.props.classes.root}>
          <Toolbar>
            <FormControl variant="standard" >
              <Select
                className={this.props.classes.qty}
                value={fontCount}
                onChange={setFontCount}
                inputProps={{
                  name: 'quantity',
                  id: 'font-quantity'
                }}
              >
                { quantityOptions.map(qty => (
                  <MenuItem key={qty} value={qty}>{qty}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <label className={this.props.classes.formElement}>&nbsp;Qty.</label>

            {categories.map(
              category => (
                <CheckboxInput
                  key={category}
                  name={category}
                  checked={categoriesWanted.includes(category)}
                  toggleCategoryWanted={toggleCategoryWanted}
                  invertCategories={invertCategories}
                  className={this.props.classes.formElement}
                />
              )
            )}
            <Button
              variant="contained"
              color="secondary"
              onClick={this.randomizeFonts}
            >
              Reload
            </Button>
          </Toolbar>
        </AppBar>
        <Toolbar></Toolbar>
      </React.Fragment>
    )
  }
}

Controls.propTypes = {
  allFonts: PropTypes.array.isRequired,
  randomFonts: PropTypes.array.isRequired,
  fontCount: PropTypes.number.isRequired,
  categoriesWanted: PropTypes.array.isRequired,
  fetchFonts: PropTypes.func.isRequired,
  toggleCategoryWanted: PropTypes.func.isRequired,
  setFontCount: PropTypes.func.isRequired,
  setRandomFonts: PropTypes.func.isRequired,
  setCurrentlyViewedFonts: PropTypes.func.isRequired,
  invertCategories: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  allFonts: state.fonts.allFonts,
  randomFonts: state.fonts.randomFonts,
  favoriteFonts: state.fonts.favoriteFonts,
  categoriesWanted: state.fonts.categoriesWanted,
  fontCount: state.fonts.fontCount
})

export default withStyles(styles)(connect(
  mapStateToProps,
  {
    setFontCount,
    toggleCategoryWanted,
    fetchFonts,
    setRandomFonts,
    setCurrentlyViewedFonts,
    invertCategories
  }
)(Controls));
