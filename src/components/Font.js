import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import heart from '../heart.js';

import { toggleFavorite } from '../actions/fontActions';

const Font = props => {

  const { font, sampleSentence, favorite, toggleFavorite } = props;

  return (
    <div className="font-card">
      <p
        // contentEditable without a React warning in the console
        ref={function(e){if(e != null) e.contentEditable=true;}}
        className="sample-sentence"
        style={{fontFamily: font.family}}
        title="Click to edit this text"
      >
        {sampleSentence}
      </p>
      <p>
        font:&nbsp;<span className="font-info">{font.family}</span>&#8203;
        category:&nbsp;<span className="font-info">{font.category}</span>&#8203;
        variants:&nbsp;<span className="font-info">{font.variants.length}</span>&#8203;
        <a
          className="font-info"
          href={'https://fonts.google.com/specimen/' + font.family}
          target="_blank"
          rel="noopener noreferrer"
          title="Open in Google Fonts"
        >
          Link
        </a>
        <span
          className={favorite ? 'heart favorite' : 'heart'}
          title={favorite ? 'Remove from Favorites' : 'Add to Favorites'}
          onClick={() => toggleFavorite(font)}
        >
          {heart}
        </span>
      </p>
    </div>
    )
}

Font.propTypes = {
  font: PropTypes.object.isRequired,
  sampleSentence: PropTypes.string.isRequired,
  favorite: PropTypes.bool.isRequired,
  toggleFavorite: PropTypes.func.isRequired
}

export default connect(null, { toggleFavorite })(Font);