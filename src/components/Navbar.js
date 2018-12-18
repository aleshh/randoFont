import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import WebFont from 'webfontloader';

import CheckboxInput from './CheckboxInput';

import {
  toggleCategoryWanted, setFontCount,  fetchFonts, setRandomFonts
} from '../actions/fontActions';

class Navbar extends Component {

  componentWillMount() {
    this.props.fetchFonts();
  }

  componentDidUpdate() {
    if (this.props.randomFonts.length === 0) {
      this.randomizeFonts();
    }
  }

  getRandomFont = arr => arr[this.random(arr.length) - 1];
  random = max => Math.floor(Math.random() * max) + 1;

  randomizeFonts = () => {
    const { categoriesWanted, fontCount, allFonts } = this.props;
    const fontList = [];

    if (allFonts.length === 0) return;

    if (categoriesWanted.length === 0) return;

    while (fontList.length < fontCount) {
      const font = this.getRandomFont(allFonts);

      // add the font if it's the right category and it's not
      // already in the list
      if (categoriesWanted.includes(font.category)
          && !fontList.includes(font)) {
        fontList.push(font);
      }
    }

    WebFont.load({
      google: {
        families: fontList.map(font => font.family)
      }
    });

    this.props.setRandomFonts(fontList);
  }

  render() {
    const categories = [
      'serif', 'sans-serif', 'display', 'handwriting', 'monospace'
    ];

    return (
      <div className="navbar">
        <h1>randoFont</h1>
        <div className="controls">
          <div>
            <select
              id="qty"
              defaultValue="3"
              name="fontCount"
              onChange={this.props.setFontCount}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="8">8</option>
              <option value="12">12</option>
            </select> Qty.
          </div>
          {categories.map(
            category => (
              <CheckboxInput
                key={category}
                name={category}
                checked={this.props.categoriesWanted.includes(category)}
                changeStyles={this.props.toggleCategoryWanted}
              />
            )
          )}
          <button onClick={this.randomizeFonts}>Reload</button>
        </div>
      </div>
    )
  }
}

Navbar.propTypes = {
  allFonts: PropTypes.array.isRequired,
  randomFonts: PropTypes.array.isRequired,
  categoriesWanted: PropTypes.array.isRequired,
  fetchFonts: PropTypes.func.isRequired,
  toggleCategoryWanted: PropTypes.func.isRequired,
  setFontCount: PropTypes.func.isRequired,
  setRandomFonts: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  allFonts: state.fonts.allFonts,
  randomFonts: state.fonts.randomFonts,
  categoriesWanted: state.fonts.categoriesWanted,
  fontCount: state.fonts.fontCount
})

export default connect(
  mapStateToProps, {
    setFontCount,
    toggleCategoryWanted,
    fetchFonts,
    setRandomFonts
  }
)(Navbar);
