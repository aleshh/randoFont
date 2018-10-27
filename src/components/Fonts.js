import React, { Component } from 'react';
import Font from './Font';
import PropTypes from 'prop-types';

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

export default Fonts;