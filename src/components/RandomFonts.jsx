import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import { makeStyles } from '@material-ui/styles';
import Container from '@material-ui/core/Container';

import Controls from './Controls';
import FontsList from './FontsList';
import { getEligibleFonts } from '../utils/fontFilters';

const useStyles = makeStyles({
  matchCount: {
    margin: '16px 25px 12px',
    fontSize: '0.9rem',
    fontWeight: 600,
    color: '#333'
  }
});

const RandomFonts = (props) => {
  const classes = useStyles();
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
    <Controls/>
      <Container maxWidth="lg">
        <div className={classes.matchCount}>
          {matchText}
        </div>
      </Container>
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
