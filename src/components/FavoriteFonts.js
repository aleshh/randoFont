import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Navbar from './Navbar';
import FontsList from './FontsList';

const FavoriteFonts = props => {
  const { favoriteFonts } = props;

  return (
    <React.Fragment>
      <Navbar route="FavoriteFonts" />
      <FontsList fonts={favoriteFonts} />
    </React.Fragment>
  )
}

FavoriteFonts.propTypes = {
  favoriteFonts: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
  favoriteFonts: state.fonts.favoriteFonts,
});

export default connect(mapStateToProps, null)(FavoriteFonts);