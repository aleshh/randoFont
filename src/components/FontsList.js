import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import WebFont from 'webfontloader';

import { setCurrentlyViewedFonts } from '../actions/fontActions';

import Font from './Font';


class FontsList extends Component {

  componentWillMount() {
    // we are using this currentlyViewedFonts, assigned here, instead of using
    // fonts passed from the parent component, so that on the FavoriteFonts
    // screen the user can toggle a font's Favorite status without it
    // immediately disapearing. It's removed from favoriteFonts but not
    // currentlyViewedFonts, so it can be re-favorited if it was a mistake
    this.props.setCurrentlyViewedFonts(this.props.fonts);
  }

  render() {
    const { sampleSentence, favoriteFonts, currentlyViewedFonts } = this.props;

    const fonts = currentlyViewedFonts;

    if(fonts.length > 0) {
      WebFont.load({
        google: {
          families: [...fonts.map(font => font.family)]
        }
      });
    }

    return (
      <div className="container">
        {fonts.map(
          font => (<Font
            key={font.family}
            font={font}
            sampleSentence={sampleSentence}
            favorite={favoriteFonts.includes(font)}
          />)
        )}
      </div>
    )
  }
}

FontsList.propTypes = {
  fonts: PropTypes.array.isRequired,
  favoriteFonts: PropTypes.array.isRequired,
  sampleSentence: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
  favoriteFonts: state.fonts.favoriteFonts,
  currentlyViewedFonts: state.fonts.currentlyViewedFonts,
  sampleSentence: state.fonts.sampleSentence
});

export default connect(mapStateToProps, { setCurrentlyViewedFonts })(FontsList);