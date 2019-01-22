import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CheckboxInput from './CheckboxInput';

import {
  toggleCategoryWanted,
  setFontCount,
  fetchFonts,
  setRandomFonts,
  setCurrentlyViewedFonts
} from '../actions/fontActions';

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

    const fontQty = (eligibleFonts.length < fontCount) ?
      eligibleFonts.length :
      fontCount;

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

    console.log(randomFonts[0])
    this.props.setRandomFonts(randomFonts);
    this.props.setCurrentlyViewedFonts(randomFonts);
  }

  render() {
    const { fontCount, categoriesWanted, toggleCategoryWanted, setFontCount } = this.props;
    const categories = [
      'serif', 'sans-serif', 'display', 'handwriting', 'monospace'
    ];

    return (
      <div className="controls">
        <div>
          <select
            id="qty"
            className="controls-quantity"
            defaultValue={fontCount}
            name="fontCount"
            onChange={setFontCount}
          >
            <option value="1">1</option>
            <option value="3">3</option>
            <option value="6">6</option>
            <option value="12">12</option>
            <option value="24">24</option>
            <option value="48">48</option>
          </select> Qty.
        </div>
        {categories.map(
          category => (
            <CheckboxInput
              key={category}
              name={category}
              checked={categoriesWanted.includes(category)}
              changeStyles={toggleCategoryWanted}
            />
          )
        )}
        <button className="controls-reload-button" onClick={this.randomizeFonts}>Reload</button>
      </div>
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
  setCurrentlyViewedFonts: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  allFonts: state.fonts.allFonts,
  randomFonts: state.fonts.randomFonts,
  favoriteFonts: state.fonts.favoriteFonts,
  categoriesWanted: state.fonts.categoriesWanted,
  fontCount: state.fonts.fontCount
})

export default connect(
  mapStateToProps,
  {
    setFontCount,
    toggleCategoryWanted,
    fetchFonts,
    setRandomFonts,
    setCurrentlyViewedFonts
  }
)(Controls);
