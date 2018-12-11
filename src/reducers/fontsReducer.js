import C from '../actions/types';

const initialState = {
  allFonts: [],
  randomFonts: [],
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
    case C.RANDOMIZE_FONTS:
      return {
        ...state,
        randomFonts: action.payload
      }

    default:
      return state;
  }
}