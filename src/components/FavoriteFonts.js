import React, { Component } from 'react';
import Font from './Font';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { removeFavoriteFont } from '../actions/fontActions';

class Fonts extends Component {
  static propTypes = {
    favoriteFonts: PropTypes.array.isRequired,
    sampleSentence: PropTypes.string.isRequired,
    removeFavoriteFont: PropTypes.func.isRequired
  }

  render() {
    return (
      <div className="container">
        {this.props.favoriteFonts.map(
          font => (<Font
            key={font.family}
            font={font}
            sampleSentence={this.props.sampleSentence}
            fontAction={this.props.removeFavoriteFont}
            fontActionName="Remove from favorites"
          />)
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  favoriteFonts: state.fonts.favoriteFonts,
  sampleSentence: state.fonts.sampleSentence,
});

export default connect(mapStateToProps, { removeFavoriteFont })(Fonts);