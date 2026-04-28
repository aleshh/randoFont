export const getFontPoolKey = fonts => fonts
  .map(font => font.family)
  .sort()
  .join('|');

const shuffle = items => {
  const shuffled = [...items];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const r = Math.floor(Math.random() * (i + 1));
    const current = shuffled[i];

    shuffled[i] = shuffled[r];
    shuffled[r] = current;
  }

  return shuffled;
};

export const getNextRandomFonts = ({
  eligibleFonts,
  fontCount,
  poolKey,
  remainingFontFamilies
}) => {
  const requestedCount = fontCount === 'all' ? eligibleFonts.length : fontCount;
  const fontQty = Math.min(eligibleFonts.length, requestedCount);
  const nextPoolKey = getFontPoolKey(eligibleFonts);
  const fontsByFamily = eligibleFonts.reduce((fonts, font) => {
    fonts[font.family] = font;
    return fonts;
  }, {});
  const selectedFamilies = [];
  let queue = poolKey === nextPoolKey
    ? remainingFontFamilies.filter(family => fontsByFamily[family])
    : [];

  if (queue.length === 0) {
    queue = shuffle(eligibleFonts.map(font => font.family));
  }

  while (selectedFamilies.length < fontQty) {
    if (queue.length === 0) {
      const selectedInThisBatch = new Set(selectedFamilies);
      queue = shuffle(
        eligibleFonts
          .map(font => font.family)
          .filter(family => !selectedInThisBatch.has(family))
      );
    }

    selectedFamilies.push(queue.shift());
  }

  return {
    poolKey: nextPoolKey,
    remainingFontFamilies: queue,
    randomFonts: selectedFamilies.map(family => fontsByFamily[family])
  };
};
