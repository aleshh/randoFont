import React, { Component } from 'react'

export class Fonts extends Component {
  render() {
    return (
      <div className="container">
        {this.props.randomFonts.map(
          font => (
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
                {this.props.sampleSentence}
              </p>
            </div>
          )
        )}
      </div>
    )
  }
}

export default Fonts






