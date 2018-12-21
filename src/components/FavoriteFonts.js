import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { removeFavoriteFont } from '../actions/fontActions';
import Font from './Font';

class Fonts extends Component {
  static propTypes = {
    favoriteFonts: PropTypes.array.isRequired,
    sampleSentence: PropTypes.string.isRequired,
    removeFavoriteFont: PropTypes.func.isRequired
  }

  noFavorites = (
    <div className="no-favorites">
      <p>There are no favorites. <Link to="/">Add some?</Link></p>
    </div>
  );

  render() {
    console.log('length:', this.props.favoriteFonts.length);
    return (
      <div className="container">
        {this.props.favoriteFonts.length === 0 ?
          this.noFavorites :
          this.props.favoriteFonts.map(
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