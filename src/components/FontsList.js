import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import WebFont from 'webfontloader';

import Font from './Font';

class FontsList extends Component {

  render() {
    const { fonts, sampleSentence, favoriteFonts } = this.props;

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
  sampleSentence: state.fonts.sampleSentence,
});

export default connect(mapStateToProps, null)(FontsList);