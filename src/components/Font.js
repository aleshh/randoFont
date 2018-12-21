import React from 'react';
import PropTypes from 'prop-types';
import heart from '../heart.js';

function Font(props) {
  const { font, sampleSentence, fontAction, fontActionName } = props;

  console.log('Font:', heart);
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
        <span
          className="action"
          onClick={() => fontAction(font)}
          >{fontActionName}</span>
        <span className="heart">
          {heart}
        </span>
      </p>
    </div>
    )
}

Font.propTypes = {
  font: PropTypes.object.isRequired,
  sampleSentence: PropTypes.string.isRequired,
  fontAction: PropTypes.func.isRequired,
  fontActionName: PropTypes.string.isRequired
}

export default Font;