import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import Font from './Font';
import { toggleFavorite } from '../actions/fontActions';

class FontsList extends Component {

  render() {
    const { fonts, sampleSentence } = this.props;

    return (
      <div className="container">
        {fonts.map(
            font => (<Font
              key={font.family}
              font={font}
              sampleSentence={sampleSentence}
              favorite={favoriteFonts.includes(font)}
              togggleFavorite={toggleFavorite}
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