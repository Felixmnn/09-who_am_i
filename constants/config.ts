export const LEVEL_CATEGORIES = ["history", "politics", "sports", "media", "science"] as const;
export const LEVEL_ORDER = ["LOW", "MEDIUM", "HIGH"] as const;
export type Level = typeof LEVEL_ORDER[number];
export type LevelCategory = typeof LEVEL_CATEGORIES[number];

export const formatCategoryLabel = (category: LevelCategory) =>
  category.charAt(0).toUpperCase() + category.slice(1);

export const config = {
  test: {},
};
