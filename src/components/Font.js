import React, { Component } from 'react'

export class Font extends Component {
  render() {
    const { font, sampleSentence } = this.props;

    return (
      <div className="font-card">
        <p class="sample-sentence" style={{fontFamily: font.family}}>
          <a
            href={'https://fonts.google.com/specimen/' + font.family}
            target="_blank"
            rel="noopener noreferrer"
          >
            {sampleSentence}
          </a>
        </p>
        <p>
          font: <span class="font-info">{font.family}</span>
          category: <span class="font-info">{font.category}</span>
          variants: <span class="font-info">{font.variants.length}</span>
        </p>
      </div>
      )
  }
}

export default Font;
