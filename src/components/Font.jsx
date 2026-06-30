import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ExternalLink, Heart } from 'lucide-react';

import { toggleFavorite } from '../actions/fontActions';

const Slash = () => <span className="font-detail-separator"> / </span>

const Font = props => {
  const { font, sampleSentence, favorite, toggleFavorite } = props;

  return (
    <article className="font-card">
      <div className="font-card-content">
        <h2
          className="sample-sentence"
          style={{fontFamily: font.family}}
          contentEditable
          suppressContentEditableWarning
        >
          {sampleSentence}
        </h2>
        <p className="font-details">
          font: <span className="font-detail-value">{font.family}</span>
          <Slash />
          category: <span className="font-detail-value">{font.category}</span>
          <Slash />
          variants: <span className="font-detail-value">{font.variants.length}</span>
        </p>
      </div>
      <div className="font-card-actions">
        <button
          type="button"
          className={`icon-button ${favorite ? 'icon-button-active' : ''}`}
          onClick={() => toggleFavorite(font)}
          title={favorite ? 'Remove from Favorites' : 'Add to Favorites'}
          aria-label={favorite ? 'Remove from Favorites' : 'Add to Favorites'}
        >
          <Heart size={20} fill={favorite ? 'currentColor' : 'none'} aria-hidden="true" />
        </button>
        <a
          className="icon-button"
          href={'https://fonts.google.com/specimen/' + font.family}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${font.family} in Google Fonts`}
          title="Open in Google Fonts"
        >
          <ExternalLink size={20} aria-hidden="true" />
        </a>
      </div>
    </article>
  )
}

Font.propTypes = {
  font: PropTypes.object.isRequired,
  sampleSentence: PropTypes.string.isRequired,
  favorite: PropTypes.bool.isRequired,
  toggleFavorite: PropTypes.func.isRequired
}

export default connect(null, { toggleFavorite })(Font);
