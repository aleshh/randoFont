import React, { Component } from 'react';
import Font from './Font';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import Controls from './Controls';

class RandomFonts extends Component {
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
            />)
          )}
        </div>
      </React.Fragment>
    )
  }
}

RandomFonts.propTypes = {
  randomFonts: PropTypes.array.isRequired,
  sampleSentence: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
  randomFonts: state.fonts.randomFonts,
  sampleSentence: state.fonts.sampleSentence,
});

export default connect(mapStateToProps, {})(RandomFonts);