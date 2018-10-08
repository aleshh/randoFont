import React, { Component } from 'react';
import Font from './Font';

export class Fonts extends Component {
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

export default Fonts






