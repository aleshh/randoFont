import C from './types';

export const fetchFonts = () => dispatch => {
  const API_KEY = import.meta.env.VITE_API_KEY;

  if (!API_KEY) {
    console.warn('Missing VITE_API_KEY; skipping Google Fonts fetch.');
    dispatch({
      type: C.FETCH_FONTS,
      payload: []
    });
    return;
  }

  fetch('https://www.googleapis.com/webfonts/v1/webfonts?key=' + API_KEY)
  .then(response => response.json())
  .then(fonts => {
    if (!fonts || !Array.isArray(fonts.items)) {
      console.warn('Google Fonts response missing items.');
      dispatch({
        type: C.FETCH_FONTS,
        payload: []
      });
      return;
    }
    if (import.meta.env.DEV) {
      console.log('Fetched fonts:', fonts.items.length);
    }
    dispatch({
      type: C.FETCH_FONTS,
      payload: fonts.items
    });
  })
  .catch(error => {
    console.error('Failed to fetch Google Fonts:', error);
    dispatch({
      type: C.FETCH_FONTS,
      payload: []
    });
  });
}

export const setRandomFonts = randomFonts => dispatch => {
  dispatch({
    type: C.SET_RANDOM_FONTS,
    payload: randomFonts
  });
}

export const setCurrentlyViewedFonts = fonts => dispatch => {
  dispatch({
    type: C.SET_CURRENTLY_VIEWED_FONTS,
    payload: fonts
  });
}

export const invertCategories = e => dispatch => {
  const fontToIgnore = e.target.name;
  dispatch({
    type: C.INVERT_CATEGORIES,
    payload: fontToIgnore
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

export const setSubsetWanted = subset => dispatch => {
  dispatch({
    type: C.SET_SUBSET,
    payload: subset.target.value
  });
}

export const toggleFavorite = font => dispatch => {
  dispatch({
    type: C.TOGGLE_FAVORITE,
    payload: font
  });
}
