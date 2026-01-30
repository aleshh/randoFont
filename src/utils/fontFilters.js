const latinSubsets = ['latin', 'latin-ext', 'vietnamese'];

export const getEligibleFonts = ({
  allFonts,
  categoriesWanted,
  favoriteFonts,
  subsetWanted
}) => {
  if (!Array.isArray(allFonts) || allFonts.length === 0) return [];
  if (!Array.isArray(categoriesWanted) || categoriesWanted.length === 0) return [];

  const favorites = Array.isArray(favoriteFonts) ? favoriteFonts : [];
  const subsetFilter = subsetWanted || 'any';

  return allFonts.filter(font => {
    const subsets = Array.isArray(font.subsets) ? font.subsets : [];
    const matchesCategory = categoriesWanted.includes(font.category);
    const matchesSubset = subsetFilter === 'any'
      ? true
      : subsetFilter === 'latin'
        ? (
          subsets.some(subset => latinSubsets.includes(subset))
          && subsets.every(subset => latinSubsets.includes(subset))
        )
        : subsets.includes(subsetFilter);
    const notFavorite = !favorites.includes(font);

    return matchesCategory && matchesSubset && notFavorite;
  });
};
