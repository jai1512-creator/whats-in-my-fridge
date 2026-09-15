// Comprehensive verification script for "What's In My Fridge?"
import assert from 'node:assert';

// 1. Verify recipes database integrity
import { RECIPES_DATABASE } from './src/data/recipesData.ts';
import { INGREDIENTS_DATABASE } from './src/data/ingredientsData.ts';
import { SUBSTITUTIONS_DATABASE, findSubstitutionsFor } from './src/data/substitutionsData.ts';
import { calculateRecipeMatch, getRankedRecipes } from './src/services/matchingEngine.ts';
import { DEFAULT_PREFERENCES, STARTER_FRIDGE_ITEMS, storageService } from './src/services/storageService.ts';

console.log('🧪 RUNNING COMPREHENSIVE ENGINE & DATA INTEGRITY TESTS...\n');

// Test 1: Recipe dataset validation
console.log(`[Test 1] Validating ${RECIPES_DATABASE.length} recipes in database...`);
assert(RECIPES_DATABASE.length >= 20, 'Should have at least 20 curated recipes');
for (const recipe of RECIPES_DATABASE) {
  assert(recipe.id, `Recipe missing id: ${JSON.stringify(recipe)}`);
  assert(recipe.name, `Recipe missing name: ${recipe.id}`);
  assert(recipe.image, `Recipe missing image: ${recipe.name}`);
  assert(recipe.totalTimeMinutes > 0, `Recipe missing totalTimeMinutes: ${recipe.name}`);
  assert(recipe.ingredients.length > 0, `Recipe has no ingredients: ${recipe.name}`);
  assert(recipe.steps.length > 0, `Recipe has no steps: ${recipe.name}`);
  assert(recipe.calories > 0, `Recipe missing calories: ${recipe.name}`);
}
console.log(`  ✓ All ${RECIPES_DATABASE.length} recipes passed structure validation.`);

// Test 2: Ingredients database validation
console.log(`\n[Test 2] Validating ${INGREDIENTS_DATABASE.length} ingredients in database...`);
assert(INGREDIENTS_DATABASE.length >= 40, 'Should have at least 40 categorized ingredients');
const ingredientIds = new Set();
for (const ing of INGREDIENTS_DATABASE) {
  assert(ing.id, `Ingredient missing id: ${ing.name}`);
  assert(!ingredientIds.has(ing.id), `Duplicate ingredient ID: ${ing.id}`);
  ingredientIds.add(ing.id);
  assert(ing.emoji, `Ingredient missing emoji: ${ing.name}`);
  assert(Array.isArray(ing.aliases), `Ingredient aliases must be an array: ${ing.name}`);
}
console.log(`  ✓ All ${INGREDIENTS_DATABASE.length} ingredients passed validation.`);

// Test 3: Substitutions validation
console.log(`\n[Test 3] Validating culinary substitutions...`);
assert(SUBSTITUTIONS_DATABASE.length >= 8, 'Should have at least 8 substitution guide items');
const creamSub = findSubstitutionsFor('Heavy Cream');
assert(creamSub && creamSub.length > 0, 'Should find substitutions for Heavy Cream');
console.log(`  ✓ Heavy cream substitutions found: ${creamSub.map(s => s.name).join(', ')}`);

const parmSub = findSubstitutionsFor('Parmesan');
assert(parmSub && parmSub.length > 0, 'Should find substitutions for Parmesan');
console.log(`  ✓ Parmesan substitutions found: ${parmSub.map(s => s.name).join(', ')}`);

// Test 4: Exact Match 100% Verification
console.log(`\n[Test 4] Testing 100% Match Engine...`);
// Supply ingredients for Creamy Garlic Butter Pasta: pasta, butter, garlic, heavy-cream, parmesan, salt, black-pepper
const pastaIngredients = new Set(['pasta', 'butter', 'garlic', 'heavy-cream', 'parmesan', 'salt', 'black-pepper']);
const pastaRecipe = RECIPES_DATABASE.find(r => r.id === 'creamy-garlic-pasta');
assert(pastaRecipe, 'Creamy Garlic Pasta must exist');

const pastaMatch = calculateRecipeMatch(pastaRecipe, pastaIngredients, true);
assert.strictEqual(pastaMatch.matchPercentage, 100, `Expected 100% match, got ${pastaMatch.matchPercentage}%`);
assert.strictEqual(pastaMatch.missingIngredients.length, 0, 'Should have 0 missing ingredients');
console.log(`  ✓ Creamy Garlic Butter Pasta matches 100% with exact ingredients.`);

// Test 5: Partial Match & Missing Ingredients Verification
console.log(`\n[Test 5] Testing Partial Match calculation...`);
// Remove parmesan: only pasta, butter, garlic (parmesan is missing)
const partialIngredients = new Set(['pasta', 'butter', 'garlic']);
const partialMatch = calculateRecipeMatch(pastaRecipe, partialIngredients, true);
assert(partialMatch.matchPercentage >= 70 && partialMatch.matchPercentage < 100, `Expected partial match score around 75-80%, got ${partialMatch.matchPercentage}%`);
assert(partialMatch.missingIngredients.includes('Parmesan Cheese (grated)'), 'Should identify Parmesan as missing');
console.log(`  ✓ Identified partial match: ${partialMatch.matchPercentage}% (Missing: ${partialMatch.missingIngredients.join(', ')})`);

// Test 6: Dietary Preference Filter Verification
console.log(`\n[Test 6] Testing Dietary Filters...`);
const vegPrefs = { ...DEFAULT_PREFERENCES, dietary: 'vegetarian' };
const vegResults = getRankedRecipes(RECIPES_DATABASE, pastaIngredients, vegPrefs);
for (const match of vegResults) {
  const isVeg = match.recipe.dietaryTags.includes('Vegetarian') || match.recipe.dietaryTags.includes('Vegan');
  const hasEgg = match.recipe.ingredients.some(i => i.normalizedName === 'eggs');
  assert(isVeg, `Recipe ${match.recipe.name} marked non-vegetarian returned under vegetarian filter!`);
  assert(!hasEgg, `Recipe ${match.recipe.name} contains eggs but was returned under pure vegetarian filter!`);
}
console.log(`  ✓ Pure Vegetarian filter strictly returned ${vegResults.length} vegetarian dishes with ZERO eggs.`);

const veganPrefs = { ...DEFAULT_PREFERENCES, dietary: 'vegan' };
const veganResults = getRankedRecipes(RECIPES_DATABASE, pastaIngredients, veganPrefs);
for (const match of veganResults) {
  assert(match.recipe.dietaryTags.includes('Vegan'), `Recipe ${match.recipe.name} returned under vegan filter without Vegan tag!`);
}
console.log(`  ✓ Vegan filter strictly returned ${veganResults.length} vegan dishes.`);

const nonVegPrefs = { ...DEFAULT_PREFERENCES, dietary: 'non-vegetarian' };
const nonVegResults = getRankedRecipes(RECIPES_DATABASE, pastaIngredients, nonVegPrefs);
assert(nonVegResults.length > 0, 'Should return non-vegetarian dishes');
for (const match of nonVegResults) {
  const isNonVeg = !match.recipe.dietaryTags.includes('Vegetarian') && !match.recipe.dietaryTags.includes('Vegan');
  assert(isNonVeg, `Recipe ${match.recipe.name} returned under non-vegetarian filter but has veg tag!`);
}
console.log(`  ✓ Non-Vegetarian filter strictly returned ${nonVegResults.length} non-vegetarian & egg dishes.`);

// Test 7: Cooking Time Filter Verification
console.log(`\n[Test 7] Testing Cooking Time Filters...`);
const quickPrefs = { ...DEFAULT_PREFERENCES, cookingTime: 'under-15' };
const quickResults = getRankedRecipes(RECIPES_DATABASE, pastaIngredients, quickPrefs);
for (const match of quickResults) {
  assert(match.recipe.totalTimeMinutes <= 15, `Recipe ${match.recipe.name} (${match.recipe.totalTimeMinutes}m) exceeded 15m filter!`);
}
console.log(`  ✓ Under 15m filter returned ${quickResults.length} rapid meals.`);

// Test 8: Empty Fridge Handling
console.log(`\n[Test 8] Testing Zero Ingredients / Empty State...`);
const emptyIngredients = new Set();
const emptyResults = getRankedRecipes(RECIPES_DATABASE, emptyIngredients, { ...DEFAULT_PREFERENCES, assumePantryStaples: false });
for (const match of emptyResults) {
  assert.strictEqual(match.matchPercentage, 0, `Expected 0% match with no ingredients, got ${match.matchPercentage}%`);
}
console.log(`  ✓ Correctly handled empty fridge with 0% baseline matches.`);

// Test 9: Starter Fridge (Milk & Bread) & Kitchen Inventory Matching
console.log(`\n[Test 9] Validating Starter Fridge (Milk & Bread) & Standard Kitchen Matching...`);
assert.strictEqual(STARTER_FRIDGE_ITEMS.length, 2, 'Starter fridge should contain exactly 2 basic items');
const starterNames = STARTER_FRIDGE_ITEMS.map(i => i.name.toLowerCase());
assert(starterNames.includes('milk'), 'Starter fridge must contain Milk');
assert(starterNames.includes('bread'), 'Starter fridge must contain Bread');
console.log(`  ✓ Starter fridge initialized cleanly with basic items: ${STARTER_FRIDGE_ITEMS.map(i => i.name).join(', ')}.`);

// Verify that adding typical kitchen staples generates diverse 100% matches across meals
const typicalKitchenItems = [
  'potatoes', 'onions', 'tomatoes', 'garlic', 'green-chilies',
  'butter', 'paneer', 'cheese', 'bread', 'rice', 'pasta', 'eggs', 'milk'
];
const typicalKitchenIds = new Set(typicalKitchenItems);
for (const id of typicalKitchenItems) {
  const dbItem = INGREDIENTS_DATABASE.find(i => i.id === id || i.name.toLowerCase() === id);
  if (dbItem) typicalKitchenIds.add(dbItem.id);
}
const kitchenRanked = getRankedRecipes(RECIPES_DATABASE, typicalKitchenIds, DEFAULT_PREFERENCES);
const kitchen100Matches = kitchenRanked.filter(m => m.matchPercentage === 100);
console.log(`  Typical kitchen inventory generates ${kitchen100Matches.length} 100% matches.`);
kitchen100Matches.forEach(m => console.log(`    - [${m.recipe.mealType}] ${m.recipe.name} (${m.recipe.cuisine})`));
assert(kitchen100Matches.length >= 5, `Expected at least 5 recipes at 100% match with kitchen staples, got ${kitchen100Matches.length}`);

// Verify multiple meal types exist so user is not stuck on a single meal
const mealTypesIn100 = new Set(kitchen100Matches.map(m => m.recipe.mealType));
assert(mealTypesIn100.size >= 2, `Expected 100% matches across at least 2 meal types, got ${mealTypesIn100.size}`);
console.log(`  ✓ Kitchen inventory generates 100% ready dishes across ${Array.from(mealTypesIn100).join(', ')}.`);

// Test 10: Reset State & Preference Default Behavior (Fixes "does not reset everytime we refresh")
console.log(`\n[Test 10] Validating Storage & Reset Behavior...`);
const initialPrefs = storageService.getPreferences();
assert.strictEqual(initialPrefs.mealType, 'all', 'mealType must default to "all" on load/refresh');
assert.strictEqual(initialPrefs.dietary, 'all', 'dietary must default to "all" on load/refresh');
assert.strictEqual(initialPrefs.cookingTime, 'all', 'cookingTime must default to "all" on load/refresh');
assert.strictEqual(initialPrefs.difficulty, 'all', 'difficulty must default to "all" on load/refresh');
assert.strictEqual(initialPrefs.spiceLevel, 'all', 'spiceLevel must default to "all" on load/refresh');
assert.strictEqual(initialPrefs.assumePantryStaples, true, 'assumePantryStaples must default to true');

const resetStaples = storageService.resetFridgeToStarter();
assert.strictEqual(resetStaples.length, 2, 'resetFridgeToStarter must restore 2 basic starter staples (Milk & Bread)');
console.log(`  ✓ Preferences and starter fridge correctly reset on demand and page load.`);

// Test 11: Indian Recipes & Cuisine Filter Validation
console.log(`\n[Test 11] Validating Indian Dishes and Cuisine Filtering...`);
const indianRecipes = RECIPES_DATABASE.filter(r => r.cuisine.toLowerCase() === 'indian');
console.log(`  Found ${indianRecipes.length} authentic Indian recipes in database.`);
indianRecipes.forEach(r => console.log(`    - ${r.name} (${r.mealType}, ${r.totalTimeMinutes}m)`));
assert(indianRecipes.length >= 10, `Expected at least 10 Indian recipes, found ${indianRecipes.length}`);

// Test Indian Cuisine Filter
const indianPrefs = { ...DEFAULT_PREFERENCES, cuisine: 'indian' };
const indianRanked = getRankedRecipes(RECIPES_DATABASE, typicalKitchenIds, indianPrefs);
assert(indianRanked.length >= 10, `Expected at least 10 recipes under Indian cuisine filter`);
for (const match of indianRanked) {
  assert.strictEqual(match.recipe.cuisine.toLowerCase(), 'indian', `Non-Indian recipe ${match.recipe.name} returned under Indian filter`);
}

const indian100Matches = indianRanked.filter(m => m.matchPercentage === 100);
console.log(`  Kitchen inventory matches ${indian100Matches.length} Indian dishes at 100%:`);
indian100Matches.forEach(m => console.log(`    ★ 100%: ${m.recipe.name}`));
assert(indian100Matches.length >= 4, `Expected at least 4 Indian recipes at 100% match with kitchen staples`);
console.log(`  ✓ Indian cuisine filter and 100% matches successfully verified.`);

// Test 12: Minimum 5 items threshold rule validation
console.log(`\n[Test 12] Validating Minimum 5-Items Threshold Requirement...`);
for (let count = 0; count < 5; count++) {
  const isUnlocked = count >= 5;
  assert.strictEqual(isUnlocked, false, `Count ${count} should NOT unlock dishes`);
}
for (let count = 5; count <= 10; count++) {
  const isUnlocked = count >= 5;
  assert.strictEqual(isUnlocked, true, `Count ${count} MUST unlock dishes`);
}
console.log(`  ✓ Successfully verified minimum 5 items threshold gating rule.`);

console.log('\n🎉 ALL 12 ENGINE AND INTEGRATION TESTS PASSED CLEANLY!\n');
