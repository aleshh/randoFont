import React, { Component } from 'react';
import Font from './Font';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'


export class Fonts extends Component {
  static propTypes = {
    // allFonts: PropTypes.array,
    randomFonts: PropTypes.array.isRequired,
    sampleSentence: PropTypes.string.isRequired,
    // categoriesWanted: PropTypes.array.isRequired,
    // fontCount: PropTypes.number.isRequired,
    // fetchFonts: PropTypes.func.isRequired
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
  // allFonts: state.fonts.allFonts,
  randomFonts: state.fonts.randomFonts,
  sampleSentence: state.fonts.sampleSentence,
  // categoriesWanted: state.fonts.categoriesWanted,
  // fontCount: state.fonts.fontCount
});

export default connect(mapStateToProps, {})(Fonts);