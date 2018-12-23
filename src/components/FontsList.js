import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import WebFont from 'webfontloader';

import Font from './Font';
import { toggleFavorite } from '../actions/fontActions';

class FontsList extends Component {

  render() {
    const { fonts, sampleSentence, favoriteFonts } = this.props;

    if(fonts.lenght > 0) {
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
            toggleFavorite={toggleFavorite}
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
  sampleSentence: state.fonts.sampleSentence,
});

export default connect(mapStateToProps, {})(FontsList);