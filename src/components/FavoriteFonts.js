import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import { setCurrentlyViewedFonts } from '../actions/fontActions';

import FontsList from './FontsList';

const FavoriteFonts = props => {
  const { favoriteFonts } = props;

  return (
      <FontsList fonts={favoriteFonts} />
  )
}

FavoriteFonts.propTypes = {
  favoriteFonts: PropTypes.array.isRequired,
  // setCurrentlyViewedFonts: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  favoriteFonts: state.fonts.favoriteFonts,
});

// export default connect(mapStateToProps, { setCurrentlyViewedFonts })(FavoriteFonts);
export default connect(mapStateToProps, null)(FavoriteFonts);