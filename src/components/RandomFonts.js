import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import Controls from './Controls';
import FontsList from './FontsList';

const RandomFonts = (props) => {
  const { randomFonts } = props;
  return (
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