import WebFont from 'webfontloader';

import C from './types';

export const fetchFonts = () => dispatch => {
  const API_KEY = process.env.REACT_APP_API_KEY;

  fetch('https://www.googleapis.com/webfonts/v1/webfonts?key=' + API_KEY)
  .then(response => response.json())
  .then(fonts => {
    dispatch({
      type: C.FETCH_FONTS,
      payload: fonts
    })
  });
}

const getRandomFont = arr => arr[random(arr.length) - 1];
const random = max => Math.floor(Math.random() * max) + 1;

export const raondomizeFonts = () => dispatch => {
  const fontList = [];

  if (this.state.categoriesWanted.length === 0) {
    this.setState({
      randomFonts: []
    });
    return null;
  }

  while (fontList.length < this.state.fontCount) {
    const font = getRandomFont(this.state.allFonts);

    // add the font if it's the right category and it's not
    // already in the list
    if (this.state.categoriesWanted.includes(font.category)
        && !fontList.includes(font)) {
      fontList.push(font);
      // console.log(font);
    }
  }

  this.setState({
    randomFonts: fontList
  });
  WebFont.load({
    google: {
      families: fontList.map(font => font.family)
    }
  });
}