import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import FontsList from './FontsList';
import { getEligibleFonts } from '../utils/fontFilters';

const RandomFonts = (props) => {
  const { randomFonts, eligibleFontCount, allFontsLoaded } = props;
  const matchText = allFontsLoaded
    ? `Found ${eligibleFontCount} matching ${eligibleFontCount === 1 ? 'font' : 'fonts'}`
    : 'Loading fonts...';

  const noFonts = (
    <div className="no-fonts">
      <p>Loading ...</p>
    </div>
  );

  return (
    <React.Fragment>
      <div className="page-container">
        <div className="match-count">
          {matchText}
        </div>
      </div>
      { randomFonts.length === 0 ?
          noFonts :
          <FontsList fonts={randomFonts} />
      }
    </React.Fragment>
  )
}

RandomFonts.propTypes = {
  randomFonts: PropTypes.array.isRequired,
  eligibleFontCount: PropTypes.number.isRequired,
  allFontsLoaded: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  randomFonts: state.fonts.randomFonts,
  eligibleFontCount: getEligibleFonts({
    allFonts: state.fonts.allFonts,
    categoriesWanted: state.fonts.categoriesWanted,
    favoriteFonts: state.fonts.favoriteFonts,
    subsetWanted: state.fonts.subsetWanted
  }).length,
  allFontsLoaded: Array.isArray(state.fonts.allFonts) && state.fonts.allFonts.length > 0
});

export default connect(mapStateToProps, {})(RandomFonts);
