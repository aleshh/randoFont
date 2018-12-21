import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Font from './Font';

class FavoriteFonts extends Component {

  noFavorites = (
    <div className="no-favorites">
      <p>There are no favorites. <Link to="/">Add some?</Link></p>
    </div>
  );

  render() {
    return (
      <div className="container">
        {this.props.favoriteFonts.length === 0 ?
          this.noFavorites :
          this.props.favoriteFonts.map(
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

FavoriteFonts.propTypes = {
  favoriteFonts: PropTypes.array.isRequired,
  sampleSentence: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
  favoriteFonts: state.fonts.favoriteFonts,
  sampleSentence: state.fonts.sampleSentence,
});

export default connect(mapStateToProps, {})(FavoriteFonts);