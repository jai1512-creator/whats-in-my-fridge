import { INGREDIENTS_DATABASE } from '../data/ingredientsData';
import { Recipe, RecipeMatch, UserPreferences } from '../types';

/**
 * Normalizes an ingredient string for comparison
 */
function normalizeString(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9]/g, '').trim();
}

/**
 * Checks if a given recipe ingredient matches what the user has in their fridge or pantry
 */
export function isIngredientAvailable(
  recipeIngNormalized: string,
  userIngredientIds: Set<string>,
  assumePantryStaples: boolean
): boolean {
  // Check pantry staples
  const stapleIds = new Set(['salt', 'black-pepper', 'olive-oil', 'sugar']);
  if (assumePantryStaples && stapleIds.has(recipeIngNormalized)) {
    return true;
  }

  // Direct match with user ingredient IDs
  if (userIngredientIds.has(recipeIngNormalized)) {
    return true;
  }

  // Culinary affinity groups (common kitchen equivalents that satisfy the recipe requirement)
  const AFFINITY_GROUPS: Record<string, string[]> = {
    cheese: ['parmesan', 'mozzarella', 'cream-cheese', 'paneer'],
    paneer: ['cheese', 'mozzarella'],
    parmesan: ['cheese', 'mozzarella'],
    mozzarella: ['cheese', 'parmesan', 'paneer'],
    butter: ['olive-oil'],
    'olive-oil': ['butter'],
    onions: ['spring-onions'],
    'spring-onions': ['onions'],
    bread: ['tortillas', 'flour'],
    tortillas: ['bread'],
    lemons: ['limes'],
    limes: ['lemons'],
    pasta: ['noodles'],
    noodles: ['pasta'],
    'coriander-fresh': ['parsley', 'spring-onions'],
    'green-chilies': ['red-pepper-flakes', 'paprika'],
  };

  if (AFFINITY_GROUPS[recipeIngNormalized]) {
    for (const altId of AFFINITY_GROUPS[recipeIngNormalized]) {
      if (userIngredientIds.has(altId)) return true;
    }
  }

  // Search through database to check aliases
  const targetDef = INGREDIENTS_DATABASE.find(item => item.id === recipeIngNormalized);
  if (targetDef) {
    // If any user ingredient matches the target's aliases or ID
    for (const uId of userIngredientIds) {
      if (uId === targetDef.id) return true;
      const userDef = INGREDIENTS_DATABASE.find(item => item.id === uId);
      if (userDef) {
        if (targetDef.aliases.some(alias => normalizeString(alias) === normalizeString(userDef.name))) return true;
        if (userDef.aliases.some(alias => normalizeString(alias) === normalizeString(targetDef.name))) return true;
      }
    }
  }

  return false;
}

/**
 * Calculates match details for a single recipe
 */
export function calculateRecipeMatch(
  recipe: Recipe,
  userIngredientIds: Set<string>,
  assumePantryStaples: boolean
): RecipeMatch {
  const matchedIngredients: string[] = [];
  const missingIngredients: string[] = [];
  let pantryCoveredCount = 0;

  // Filter core (non-optional) ingredients for main percentage
  const nonOptionalIngredients = recipe.ingredients.filter(ing => !ing.optional);
  const totalCount = nonOptionalIngredients.length || 1;

  for (const ing of nonOptionalIngredients) {
    const isAvailable = isIngredientAvailable(ing.normalizedName, userIngredientIds, assumePantryStaples);
    const isStaple = ['salt', 'black-pepper', 'olive-oil', 'sugar'].includes(ing.normalizedName);

    if (isAvailable) {
      matchedIngredients.push(ing.name);
      if (isStaple && !userIngredientIds.has(ing.normalizedName)) {
        pantryCoveredCount++;
      }
    } else {
      missingIngredients.push(ing.name);
    }
  }

  const matchedCount = matchedIngredients.length;
  let matchPercentage = Math.round((matchedCount / totalCount) * 100);

  // If user has 0 ingredients selected and staples not enabled, match is 0%
  if (userIngredientIds.size === 0 && !assumePantryStaples) {
    matchPercentage = 0;
  }

  return {
    recipe,
    matchPercentage,
    matchedCount,
    totalCount,
    matchedIngredients,
    missingIngredients,
    pantryCoveredCount,
  };
}

/**
 * Filters and ranks recipes according to user fridge items and preferences
 */
export function getRankedRecipes(
  recipes: Recipe[],
  userIngredientIds: Set<string>,
  preferences: UserPreferences,
  searchQuery: string = '',
  sortBy: 'best-match' | 'quickest' | 'fewest-missing' = 'best-match'
): RecipeMatch[] {
  // Step 1: Calculate matches
  const matches = recipes.map(recipe =>
    calculateRecipeMatch(recipe, userIngredientIds, preferences.assumePantryStaples)
  );

  // Step 2: Apply preference filters
  const filtered = matches.filter(({ recipe }) => {
    // Dietary filter
    if (preferences.dietary !== 'all') {
      const d = preferences.dietary;
      const MEAT_SEAFOOD_NAMES = ['chicken', 'beef', 'pork', 'bacon', 'sausage', 'salmon', 'shrimp', 'tuna', 'fish', 'ground-beef'];
      const hasMeatOrSeafood = recipe.ingredients.some(i => MEAT_SEAFOOD_NAMES.includes(i.normalizedName));
      const hasEggs = recipe.ingredients.some(i => i.normalizedName === 'eggs');

      if (d === 'vegetarian') {
        // Pure Vegetarian: Strictly NO meat, NO poultry, NO seafood, and NO eggs!
        if (hasMeatOrSeafood || hasEggs) return false;
        const isVeg = (recipe.dietaryTags.includes('Vegetarian') || recipe.dietaryTags.includes('Vegan'));
        if (!isVeg) return false;
      } else if (d === 'non-vegetarian') {
        // Non-Vegetarian: In Indian cuisine & dietary classification, all dishes with meat, seafood, OR eggs belong in the non-vegetarian section!
        const isNonVeg = hasMeatOrSeafood || hasEggs || (!recipe.dietaryTags.includes('Vegetarian') && !recipe.dietaryTags.includes('Vegan'));
        if (!isNonVeg) return false;
      } else if (d === 'vegan') {
        if (!recipe.dietaryTags.includes('Vegan')) return false;
      } else if (d === 'egg-free') {
        const hasEgg = recipe.ingredients.some(i => i.normalizedName === 'eggs');
        if (hasEgg && !recipe.dietaryTags.includes('Egg-Free')) return false;
      } else if (d === 'dairy-free') {
        const hasDairy = recipe.ingredients.some(i =>
          ['milk', 'cheese', 'parmesan', 'butter', 'heavy-cream', 'yogurt', 'paneer'].includes(i.normalizedName)
        );
        if (hasDairy && !recipe.dietaryTags.includes('Dairy-Free')) return false;
      } else if (d === 'gluten-free') {
        if (!recipe.dietaryTags.includes('Gluten-Free')) return false;
      }
    }

    // Cooking time filter
    if (preferences.cookingTime !== 'all') {
      if (preferences.cookingTime === 'under-15' && recipe.totalTimeMinutes > 15) return false;
      if (preferences.cookingTime === 'under-30' && recipe.totalTimeMinutes > 30) return false;
      if (preferences.cookingTime === 'under-60' && recipe.totalTimeMinutes > 60) return false;
    }

    // Difficulty filter
    if (preferences.difficulty !== 'all') {
      if (recipe.difficulty.toLowerCase() !== preferences.difficulty.toLowerCase()) return false;
    }

    // Meal type filter
    if (preferences.mealType !== 'all') {
      if (recipe.mealType.toLowerCase() !== preferences.mealType.toLowerCase()) return false;
    }

    // Spice level filter
    if (preferences.spiceLevel !== 'all') {
      if (recipe.spiceLevel.toLowerCase() !== preferences.spiceLevel.toLowerCase()) return false;
    }

    // Cuisine filter
    if (preferences.cuisine && preferences.cuisine !== 'all') {
      if (recipe.cuisine.toLowerCase() !== preferences.cuisine.toLowerCase()) return false;
    }

    // Search query filter (names, cuisine, ingredient names)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const inName = recipe.name.toLowerCase().includes(q);
      const inCuisine = recipe.cuisine.toLowerCase().includes(q);
      const inDesc = recipe.description.toLowerCase().includes(q);
      const inIngredients = recipe.ingredients.some(i => i.name.toLowerCase().includes(q));
      if (!inName && !inCuisine && !inDesc && !inIngredients) return false;
    }

    return true;
  });

  // Step 3: Sort results
  filtered.sort((a, b) => {
    if (sortBy === 'quickest') {
      if (a.recipe.totalTimeMinutes !== b.recipe.totalTimeMinutes) {
        return a.recipe.totalTimeMinutes - b.recipe.totalTimeMinutes;
      }
      return b.matchPercentage - a.matchPercentage;
    }

    if (sortBy === 'fewest-missing') {
      if (a.missingIngredients.length !== b.missingIngredients.length) {
        return a.missingIngredients.length - b.missingIngredients.length;
      }
      return b.matchPercentage - a.matchPercentage;
    }

    // Default: 'best-match'
    if (b.matchPercentage !== a.matchPercentage) {
      return b.matchPercentage - a.matchPercentage;
    }
    // Secondary: fewest missing
    if (a.missingIngredients.length !== b.missingIngredients.length) {
      return a.missingIngredients.length - b.missingIngredients.length;
    }
    // Tertiary: cooking time
    return a.recipe.totalTimeMinutes - b.recipe.totalTimeMinutes;
  });

  return filtered;
}
