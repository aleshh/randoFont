import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import Controls from './Controls';
import FontsList from './FontsList';
import FavoriteFonts from './FavoriteFonts';

const RandomFonts = (props) => {
  const { randomFonts } = props;

  const noFonts = (
    <div className="no-fonts">
      <p>Could not load Google Fonts. Try refreshing your browser?</p>
    </div>
  );

  return (
    randomFonts.length === 0 ?
      noFonts :
      <React.Fragment>
        <Controls/>
        <FontsList fonts={randomFonts} />
      </React.Fragment>
  )
}

RandomFonts.propTypes = {
  randomFonts: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  randomFonts: state.fonts.randomFonts
});

export default connect(mapStateToProps, {})(RandomFonts);