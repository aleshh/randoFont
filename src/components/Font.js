import React, { Component } from 'react';
import PropTypes from 'prop-types';
import heart from '../heart.js';

class Font extends Component {

  render() {
    const { font, sampleSentence, favorite, toggleFavorite } = this.props;

    return (
      <div className="font-card">
        <p
          // contentEditable without a React warning in the console
          ref={function(e){if(e != null) e.contentEditable=true;}}
          className="sample-sentence"
          style={{fontFamily: font.family}}
        >
          {sampleSentence}
        </p>
        <p>
          font: <span className="font-info">{font.family}</span>
          category: <span className="font-info">{font.category}</span>
          variants: <span className="font-info">{font.variants.length}</span>
          <a
            className="font-info"
            href={'https://fonts.google.com/specimen/' + font.family}
            target="_blank"
            rel="noopener noreferrer"
          >
            Link
          </a>
          {favorite ? 'favorite' : 'not favorite'}
          <span className="heart" onClick={() => toggleFavorite(font)}>
            {heart}
          </span>
        </p>
      </div>
      )
    }
}

Font.propTypes = {
  font: PropTypes.object.isRequired,
  sampleSentence: PropTypes.string.isRequired,
  favorite: PropTypes.bool.isRequired,
  toggleFavorite: PropTypes.func.isRequired
}

export default Font;