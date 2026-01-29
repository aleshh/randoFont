import C from '../actions/types';

export const initialFontsState = {
  allFonts: [],
  randomFonts: [],
  favoriteFonts: [],
  currentlyViewedFonts: [],
  categoriesWanted: [
    'serif', 'sans-serif', 'display', 'handwriting', 'monospace'
  ],
  subsetWanted: 'latin',
  sampleSentence: 'Pack my box with five dozen liquor jugs.',
  fontCount: 3
}

export default function(state = initialFontsState, action) {
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
    case C.SET_CURRENTLY_VIEWED_FONTS:
      return {
        ...state,
        currentlyViewedFonts: action.payload
      }
    case C.SET_CATEGORY:
        console.log('set:', action.payload)
      return {
        ...state,
        categoriesWanted: [...state.categoriesWanted, action.payload]
      }
    case C.UNSET_CATEGORY:
        console.log('unset:', action.payload)
      return {
        ...state,
        categoriesWanted: state.categoriesWanted.filter(
          cat => cat !== action.payload
        )
      }
    case C.INVERT_CATEGORIES:
      // console.clear()
      return {
        ...state,
        categoriesWanted: initialFontsState.categoriesWanted.filter(cat => {
          return state.categoriesWanted.indexOf(cat) === -1
        })
      }
    case C.SET_FONT_COUNT:
      return {
        ...state,
        fontCount: action.payload
      }
    case C.SET_SUBSET:
      return {
        ...state,
        subsetWanted: action.payload
      }
    case C.TOGGLE_FAVORITE:
      if(state.favoriteFonts.includes(action.payload)) {
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
