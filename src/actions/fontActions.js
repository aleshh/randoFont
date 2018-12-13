import C from './types';

export const fetchFonts = () => dispatch => {
  const API_KEY = process.env.REACT_APP_API_KEY;

  fetch('https://www.googleapis.com/webfonts/v1/webfonts?key=' + API_KEY)
  .then(response => response.json())
  .then(fonts => {
    dispatch({
      type: C.FETCH_FONTS,
      payload: fonts.items
    })
  });
}

export const setRandomFonts = (randomFonts) => dispatch => {
  dispatch({
    type: C.SET_RANDOM_FONTS,
    payload: randomFonts
  })
}