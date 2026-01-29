import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import WebFont from 'webfontloader';

import Container from '@material-ui/core/Container';

import { setCurrentlyViewedFonts } from '../actions/fontActions';
import Font from './Font';

const getSampleSentence = (subsetWanted, fallbackSentence) => {
  const subsetSamples = {
    latin: 'Pack my box with five dozen liquor jugs.',
    'latin-ext': 'Pchnąć w tę łódź jeża lub ośm skrzyń fig.',
    vietnamese: 'Chữ Việt: Tôi ăn cơm với cá và uống trà.',
    cyrillic: 'Съешь же ещё этих мягких французских булок, да выпей чаю.',
    'cyrillic-ext': 'Любя, съешь щипцы — вздохнёт мэр, — кайф жгуч.',
    greek: 'Ξεσκεπάζω την ψυχοφθόρα βδελυγμία.',
    'greek-ext': 'Ξεσκεπάζω την ψυχοφθόρα βδελυγμία.',
    arabic: 'صِف خَلقَ خَودٍ كَمِثلِ الشَّمسِ إِذ بَزَغَتْ.',
    hebrew: 'דג סקרן שט בים מאוכזב ולפתע מצא לו חברה.',
    devanagari: 'यह देवनागरी नमूना वाक्य है।',
    thai: 'เป็นมนุษย์สุดประเสริฐเลิศคุณค่า',
    korean: '키스의 고유조건은 입술끼리 만나야 하고 특별한 기술은 필요치 않다.',
    japanese: 'いろはにほへと ちりぬるを'
  };

  if (!subsetWanted || subsetWanted === 'any') {
    return fallbackSentence;
  }

  return subsetSamples[subsetWanted] || fallbackSentence;
};

class FontsList extends Component {

  componentDidMount() {
    // we are using this currentlyViewedFonts, assigned here, instead of using
    // fonts passed from the parent component, so that on the FavoriteFonts
    // screen the user can toggle a font's Favorite status without it
    // immediately disapearing. It's removed from favoriteFonts but not
    // currentlyViewedFonts, so it can be re-favorited if it was a mistake
    this.props.setCurrentlyViewedFonts(this.props.fonts);
  }

  render() {
    const { sampleSentence, favoriteFonts, currentlyViewedFonts } = this.props;

    const fonts = currentlyViewedFonts;

    const noFavorites = (
      <div className="no-fonts">
        <p>There are no favorites. <Link to="/">Add some?</Link></p>
      </div>
    );

    if(fonts.length > 0) {
      WebFont.load({
        google: {
          families: [...fonts.map(font => font.family)]
        }
      });
    }

    return (
      <Container maxWidth="lg" >
        {fonts.length === 0 ?
          noFavorites :
          fonts.map(
            font => (<Font
              key={font.family}
              font={font}
              sampleSentence={sampleSentence}
              favorite={favoriteFonts.includes(font)}
            />)
        )}
      </Container>
    )
  }
}

FontsList.propTypes = {
  fonts: PropTypes.array.isRequired,
  favoriteFonts: PropTypes.array.isRequired,
  sampleSentence: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
  favoriteFonts: state.fonts.favoriteFonts,
  currentlyViewedFonts: state.fonts.currentlyViewedFonts,
  sampleSentence: getSampleSentence(
    state.fonts.subsetWanted,
    state.fonts.sampleSentence
  )
});

export default connect(mapStateToProps, { setCurrentlyViewedFonts })(FontsList);
