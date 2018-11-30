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
    default:
      return state;
  }
}