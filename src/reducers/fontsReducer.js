import C from '../actions/types';

const initialState = {
  allFonts: [],
  randomFonts: [],
  favoriteFonts: [],
  categoriesWanted: [
    'serif', 'sans-serif', 'display', 'handwriting', 'monospace'
  ],
  sampleSentence: 'Pack my box with five dozen liquor jugs.',
  fontCount: 3
}

export default function(state = initialState, action) {
  switch(action.type) {
    case C.FETCH_FONTS:
      return {
        ...state,
        allFonts: action.payload
      };
    case C.SET_RANDOM_FONTS:
      return {
        ...state,
        randomFonts: action.payload
      }
    case C.SET_CATEGORY:
      return {
        ...state,
        categoriesWanted: [...state.categoriesWanted, action.payload]
      }
    case C.UNSET_CATEGORY:
      return {
        ...state,
        categoriesWanted: state.categoriesWanted.filter(
          cat => cat !== action.payload
        )
      }
    case C.SET_FONT_COUNT:
      return {
        ...state,
        fontCount: action.payload
      }
    case C.TOGGLE_FAVORITE:
      const findFont = state.favoriteFonts.find(font =>
        font.family === action.payload.family
      );
      if(findFont) {
        return {
          ...state,
          favoriteFonts: state.favoriteFonts.filter(
            font => font.family !== action.payload.family
          )
        }
      } else {
        return {
          ...state,
          favoriteFonts: [action.payload, ...state.favoriteFonts]
        }
      }
    default:
      return state;
  }
}