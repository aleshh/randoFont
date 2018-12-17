import React, { Component } from 'react';
import Font from './Font';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

export class Fonts extends Component {
  static propTypes = {
    randomFonts: PropTypes.array.isRequired,
    sampleSentence: PropTypes.string.isRequired
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
  randomFonts: state.fonts.randomFonts,
  sampleSentence: state.fonts.sampleSentence,
});

export default connect(mapStateToProps, {})(Fonts);