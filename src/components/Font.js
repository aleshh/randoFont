import React, { Component } from 'react'

export class Font extends Component {
  render() {
    const { font, sampleSentence } = this.props;

    return (
      <div key={font.family} className="font-card">
        <h2>
          <a
            href={'https://fonts.google.com/specimen/' + font.family}
            target="_blank"
          >
            {font.family}
          </a>
        </h2>
        <p contentEditable style={{fontFamily: font.family}}>
          {sampleSentence}
        </p>
      </div>
      )
  }
}

export default Font;
