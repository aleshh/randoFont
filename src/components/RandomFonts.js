import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import Navbar from './Navbar';
import Controls from './Controls';
import FontsList from './FontsList';

const RandomFonts = (props) => {
  const { randomFonts } = props;

  const noFonts = (
    <div className="no-fonts">
      <p>Loading ...</p>
    </div>
  );

  return (
    <React.Fragment>
      <Navbar route="RandomFonts" />
      <Controls/>
      { randomFonts.length === 0 ?
          noFonts :
          <FontsList fonts={randomFonts} />
      }
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