import C from './types';

export const fetchFonts = () => dispatch => {
  const API_KEY = process.env.REACT_APP_API_KEY;

  fetch('https://www.googleapis.com/webfonts/v1/webfonts?key=' + API_KEY)
  .then(response => response.json())
  .then(fonts => {
    dispatch({
      type: C.FETCH_FONTS,
      payload: fonts.items
    });
  });
}

export const setRandomFonts = randomFonts => dispatch => {
  dispatch({
    type: C.SET_RANDOM_FONTS,
    payload: randomFonts
  });
}

export const toggleCategoryWanted = e => dispatch => {
  const category = e.target.name,
        checked = e.target.checked;

  if (checked) {
    dispatch({
      type: C.SET_CATEGORY,
      payload: category
    });
  } else {
    dispatch({
      type: C.UNSET_CATEGORY,
      payload: category
    });
  }
}

export const setFontCount = fontCount => dispatch => {
  dispatch({
    type: C.SET_FONT_COUNT,
    payload: parseInt(fontCount.target.value)
  });
}

export const addFavoriteFont = font => dispatch => {
  dispatch({
    type: C.ADD_FAVORITE_FONT,
    payload: font
  });
}

export const removeFavoriteFont = font => dispatch => {
  dispatch({
    type: C.REMOVE_FAVORITE_FONT,
    payload: font.family
  });
}

