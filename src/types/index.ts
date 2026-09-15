export type IngredientCategory =
  | 'vegetables'
  | 'fruits'
  | 'dairy'
  | 'grains'
  | 'spices'
  | 'meat'
  | 'seafood'
  | 'eggs'
  | 'pantry'
  | 'sauces'
  | 'other';

export interface Ingredient {
  id: string;
  name: string;
  category: IngredientCategory;
  emoji: string;
  aliases: string[];
  isPantryStaple?: boolean;
}

export interface FridgeItem {
  id: string;
  name: string;
  category: IngredientCategory;
  emoji: string;
  addedAt: number;
}

export interface RecipeIngredient {
  name: string;
  amount: number | string;
  unit: string;
  normalizedName: string; // for engine matching
  optional?: boolean;
  notes?: string;
}

export interface RecipeStep {
  stepNumber: number;
  instruction: string;
  timerMinutes?: number;
  timerSeconds?: number;
  tip?: string;
}

export interface Recipe {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  image: string;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  totalTimeMinutes: number;
  difficulty: 'Easy' | 'Medium' | 'Advanced';
  cuisine: string;
  mealType: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack' | 'Dessert';
  spiceLevel: 'Mild' | 'Medium' | 'Spicy';
  servings: number;
  calories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
  dietaryTags: ('Vegetarian' | 'Vegan' | 'Egg-Free' | 'Dairy-Free' | 'Gluten-Free')[];
  ingredients: RecipeIngredient[];
  steps: RecipeStep[];
  substitutions?: { [ingredientName: string]: string[] };
}

export interface IngredientSubstitute {
  name: string;
  ratio: string;
  description: string;
  whyItWorks: string;
  tags?: string[];
}

export interface SubstitutionGuideItem {
  ingredient: string;
  category: string;
  substitutes: IngredientSubstitute[];
}

export type DietaryFilter =
  | 'all'
  | 'vegetarian'
  | 'non-vegetarian'
  | 'vegan'
  | 'egg-free'
  | 'dairy-free'
  | 'gluten-free';
export type TimeFilter = 'all' | 'under-15' | 'under-30' | 'under-60';
export type DifficultyFilter = 'all' | 'easy' | 'medium' | 'advanced';
export type MealFilter = 'all' | 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'dessert';
export type SpiceFilter = 'all' | 'mild' | 'medium' | 'spicy';
export type CuisineFilter = 'all' | 'indian' | 'italian' | 'american' | 'asian' | 'mexican';

export interface UserPreferences {
  dietary: DietaryFilter;
  cookingTime: TimeFilter;
  difficulty: DifficultyFilter;
  mealType: MealFilter;
  spiceLevel: SpiceFilter;
  cuisine: CuisineFilter;
  assumePantryStaples: boolean;
}

export interface RecipeMatch {
  recipe: Recipe;
  matchPercentage: number;
  matchedCount: number;
  totalCount: number;
  matchedIngredients: string[];
  missingIngredients: string[];
  pantryCoveredCount: number;
}

export interface RecentlyCookedItem {
  id: string;
  recipeId: string;
  recipeName: string;
  recipeImage: string;
  totalTimeMinutes: number;
  cookedAt: number; // timestamp
  rating?: number;
}

export type ActiveTab = 'home' | 'ingredients' | 'discover' | 'favorites' | 'history' | 'substitutions';
