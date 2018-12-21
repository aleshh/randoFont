import React, { Component } from 'react';
import { connect} from 'react-redux';
import PropTypes from 'prop-types';
import heart from '../heart.js';

import WebFont from 'webfontloader';

import { toggleFavorite } from '../actions/fontActions';

class Font extends Component {

  render() {
    const { font, sampleSentence, fontAction, fontActionName } = this.props;

    WebFont.load({
      google: {
        families: [font.family]
      }
    });

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
          <span className="heart" onClick={() => this.props.toggleFavorite(font)}>
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
  toggleFavorite: PropTypes.func.isRequired
}

export default connect(null, { toggleFavorite })(Font);