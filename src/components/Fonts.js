import React, { Component } from 'react';
import Font from './Font';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import WebFont from 'webfontloader';

import { fetchFonts, setRandomFonts } from '../actions/fontActions'

export class Fonts extends Component {
  static propTypes = {
    allFonts: PropTypes.array,
    randomFonts: PropTypes.array.isRequired,
    sampleSentence: PropTypes.string.isRequired,
    categoriesWanted: PropTypes.array.isRequired,
    fontCount: PropTypes.number.isRequired,
    fetchFonts: PropTypes.func.isRequired
  }

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

    if (categoriesWanted.length === 0) {
      setRandomFonts();
      return;
    }

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
    return (
      <div className="container">
        {this.props.randomFonts.map(
          font => (<Font
            key={font.family}
            font={font}
            sampleSentence={this.props.sampleSentence}
          />)
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  allFonts: state.fonts.allFonts,
  randomFonts: state.fonts.randomFonts,
  sampleSentence: state.fonts.sampleSentence,
  categoriesWanted: state.fonts.categoriesWanted,
  fontCount: state.fonts.fontCount
});

export default connect(mapStateToProps, { fetchFonts, setRandomFonts })(Fonts);