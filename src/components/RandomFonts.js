import React, { Component } from 'react';
import Font from './Font';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { addFavoriteFont } from '../actions/fontActions';

import Controls from './Controls';

class RandomFonts extends Component {
  static propTypes = {
    randomFonts: PropTypes.array.isRequired,
    sampleSentence: PropTypes.string.isRequired,
    addFavoriteFont: PropTypes.func.isRequired
  }

  render() {
    return (
      <React.Fragment>
        <Controls/>
      <div className="container">
        {this.props.randomFonts.map(
          font => (<Font
            key={font.family}
            font={font}
            sampleSentence={this.props.sampleSentence}
            fontAction={this.props.addFavoriteFont}
            fontActionName="Add to favorites"
          />)
        )}
      </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  randomFonts: state.fonts.randomFonts,
  sampleSentence: state.fonts.sampleSentence,
});

export default connect(mapStateToProps, { addFavoriteFont })(RandomFonts);