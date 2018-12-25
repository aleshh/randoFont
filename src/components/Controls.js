import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CheckboxInput from './CheckboxInput';

import {
  toggleCategoryWanted, setFontCount,  fetchFonts, setRandomFonts
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

  getRandomFont = arr => arr[this.random(arr.length) - 1];
  random = max => Math.floor(Math.random() * max) + 1;

  randomizeFonts = () => {
    const { categoriesWanted, fontCount, allFonts } = this.props;
    const fontList = [];

    if (allFonts.length === 0) return;
    if (categoriesWanted.length === 0) return;

    while (fontList.length < fontCount) {
      const font = this.getRandomFont(allFonts);

      // add the font if it's the right category, it's not already in the list,
      // and it's not already in the favorites list
      if (categoriesWanted.includes(font.category)
          && !fontList.includes(font)
          && !this.props.favoriteFonts.includes(font)) {
        fontList.push(font);
      }
    }

    this.props.setRandomFonts(fontList);
  }

  render() {
    const categories = [
      'serif', 'sans-serif', 'display', 'handwriting', 'monospace'
    ];

    return (
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
    )
  }
}

Controls.propTypes = {
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
    setRandomFonts
  }
)(Controls);
