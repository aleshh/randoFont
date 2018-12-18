import React from 'react';
import PropTypes from 'prop-types';

function Font(props) {
  const { font, sampleSentence } = props;

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
          href={'https://fonts.google.com/specimen/' + font.family}
          target="_blank"
          rel="noopener noreferrer"
        >
          Link
        </a>
      </p>
    </div>
    )
}

Font.propTypes = {
  font: PropTypes.object.isRequired,
  sampleSentence: PropTypes.string.isRequired
}

export default Font;