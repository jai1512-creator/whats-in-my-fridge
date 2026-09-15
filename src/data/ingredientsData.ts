import { Ingredient, IngredientCategory } from '../types';

export const CATEGORIES: { id: IngredientCategory; label: string; icon: string }[] = [
  { id: 'vegetables', label: 'Vegetables', icon: '🥦' },
  { id: 'fruits', label: 'Fruits', icon: '🍎' },
  { id: 'dairy', label: 'Dairy', icon: '🧀' },
  { id: 'grains', label: 'Grains & Pasta', icon: '🌾' },
  { id: 'meat', label: 'Meat & Poultry', icon: '🍗' },
  { id: 'seafood', label: 'Seafood', icon: '🦐' },
  { id: 'eggs', label: 'Eggs', icon: '🥚' },
  { id: 'spices', label: 'Spices & Herbs', icon: '🌿' },
  { id: 'pantry', label: 'Pantry Basics', icon: '🏺' },
  { id: 'sauces', label: 'Sauces & Condiments', icon: '🥫' },
  { id: 'other', label: 'Other', icon: '🥑' },
];

export const COMMON_STAPLES_LIST = [
  'Eggs',
  'Milk',
  'Cheese',
  'Butter',
  'Bread',
  'Rice',
  'Pasta',
  'Potatoes',
  'Tomatoes',
  'Onions',
  'Garlic',
  'Chicken',
  'Paneer',
  'Green Chilies',
  'Lentils / Dal',
  'Yogurt',
  'Flour',
  'Spinach',
  'Carrots',
  'Capsicum',
  'Mushrooms',
  'Olive Oil',
];

export const INGREDIENTS_DATABASE: Ingredient[] = [
  // --- VEGETABLES ---
  { id: 'onions', name: 'Onions', category: 'vegetables', emoji: '🧅', aliases: ['onion', 'yellow onion', 'red onion', 'shallot', 'shallots'] },
  { id: 'garlic', name: 'Garlic', category: 'vegetables', emoji: '🧄', aliases: ['garlic cloves', 'minced garlic', 'garlic clove', 'crushed garlic'] },
  { id: 'tomatoes', name: 'Tomatoes', category: 'vegetables', emoji: '🍅', aliases: ['tomato', 'cherry tomatoes', 'roma tomato', 'diced tomatoes', 'plum tomato'] },
  { id: 'potatoes', name: 'Potatoes', category: 'vegetables', emoji: '🥔', aliases: ['potato', 'russet potato', 'baby potato', 'mashed potato', 'yukon gold'] },
  { id: 'spinach', name: 'Spinach', category: 'vegetables', emoji: '🥬', aliases: ['baby spinach', 'spinach leaves', 'frozen spinach', 'greens'] },
  { id: 'carrots', name: 'Carrots', category: 'vegetables', emoji: '🥕', aliases: ['carrot', 'baby carrots', 'grated carrot'] },
  { id: 'capsicum', name: 'Capsicum', category: 'vegetables', emoji: '🫑', aliases: ['bell pepper', 'green pepper', 'red pepper', 'yellow pepper', 'peppers'] },
  { id: 'mushrooms', name: 'Mushrooms', category: 'vegetables', emoji: '🍄', aliases: ['mushroom', 'button mushrooms', 'cremini', 'portobello', 'shiitake'] },
  { id: 'broccoli', name: 'Broccoli', category: 'vegetables', emoji: '🥦', aliases: ['broccoli florets', 'tenderstem broccoli'] },
  { id: 'cauliflower', name: 'Cauliflower', category: 'vegetables', emoji: '🥦', aliases: ['cauliflower florets', 'cauliflower rice'] },
  { id: 'zucchini', name: 'Zucchini', category: 'vegetables', emoji: '🥒', aliases: ['courgette', 'green squash'] },
  { id: 'cucumber', name: 'Cucumber', category: 'vegetables', emoji: '🥒', aliases: ['cucumbers', 'english cucumber', 'persian cucumber'] },
  { id: 'avocado', name: 'Avocado', category: 'vegetables', emoji: '🥑', aliases: ['avocados', 'hass avocado', 'ripe avocado'] },
  { id: 'peas', name: 'Green Peas', category: 'vegetables', emoji: '🟢', aliases: ['peas', 'frozen peas', 'sweet peas'] },
  { id: 'corn', name: 'Sweet Corn', category: 'vegetables', emoji: '🌽', aliases: ['corn', 'corn kernels', 'canned corn'] },
  { id: 'lettuce', name: 'Lettuce', category: 'vegetables', emoji: '🥗', aliases: ['romaine', 'salad greens', 'iceberg', 'arugula'] },
  { id: 'ginger', name: 'Fresh Ginger', category: 'vegetables', emoji: '🫚', aliases: ['ginger', 'ginger root', 'grated ginger'] },
  { id: 'green-chilies', name: 'Green Chilies', category: 'vegetables', emoji: '🌶️', aliases: ['green chili', 'chilli', 'jalapeño', 'serrano'] },
  { id: 'spring-onions', name: 'Spring Onions', category: 'vegetables', emoji: '🌱', aliases: ['scallions', 'green onions'] },

  // --- FRUITS ---
  { id: 'lemons', name: 'Lemon', category: 'fruits', emoji: '🍋', aliases: ['lemons', 'lemon juice', 'lemon zest'] },
  { id: 'limes', name: 'Lime', category: 'fruits', emoji: '🟢', aliases: ['limes', 'lime juice', 'lime zest'] },
  { id: 'apples', name: 'Apples', category: 'fruits', emoji: '🍎', aliases: ['apple', 'green apple', 'red apple', 'gala apple'] },
  { id: 'bananas', name: 'Bananas', category: 'fruits', emoji: '🍌', aliases: ['banana', 'ripe banana'] },
  { id: 'strawberries', name: 'Strawberries', category: 'fruits', emoji: '🍓', aliases: ['strawberry', 'fresh berries', 'berries'] },
  { id: 'blueberries', name: 'Blueberries', category: 'fruits', emoji: '🫐', aliases: ['blueberry', 'fresh blueberries'] },
  { id: 'oranges', name: 'Oranges', category: 'fruits', emoji: '🍊', aliases: ['orange', 'orange juice'] },

  // --- DAIRY ---
  { id: 'milk', name: 'Milk', category: 'dairy', emoji: '🥛', aliases: ['whole milk', 'cow milk', 'skim milk', 'almond milk', 'oat milk'] },
  { id: 'cheese', name: 'Cheddar Cheese', category: 'dairy', emoji: '🧀', aliases: ['cheese', 'cheddar', 'grated cheese', 'shredded cheese'] },
  { id: 'parmesan', name: 'Parmesan Cheese', category: 'dairy', emoji: '🧀', aliases: ['parmesan', 'parmigiano', 'pecorino', 'hard cheese'] },
  { id: 'mozzarella', name: 'Mozzarella', category: 'dairy', emoji: '🧀', aliases: ['fresh mozzarella', 'pizza cheese', 'shredded mozzarella'] },
  { id: 'butter', name: 'Butter', category: 'dairy', emoji: '🧈', aliases: ['salted butter', 'unsalted butter', 'melted butter'] },
  { id: 'heavy-cream', name: 'Heavy Cream', category: 'dairy', emoji: '🥛', aliases: ['heavy whipping cream', 'double cream', 'cooking cream', 'whipping cream'] },
  { id: 'yogurt', name: 'Yogurt', category: 'dairy', emoji: '🥣', aliases: ['greek yogurt', 'curd', 'plain yogurt', 'dahi'] },
  { id: 'paneer', name: 'Paneer', category: 'dairy', emoji: '🧀', aliases: ['cottage cheese', 'indian paneer', 'paneer cubes'] },
  { id: 'cream-cheese', name: 'Cream Cheese', category: 'dairy', emoji: '🥯', aliases: ['philadelphia', 'spreadable cheese'] },

  // --- GRAINS & PASTA ---
  { id: 'pasta', name: 'Pasta', category: 'grains', emoji: '🍝', aliases: ['spaghetti', 'penne', 'macaroni', 'fettuccine', 'linguine', 'rigatoni', 'fusilli'] },
  { id: 'rice', name: 'Rice', category: 'grains', emoji: '🍚', aliases: ['white rice', 'basmati rice', 'jasmine rice', 'brown rice', 'cooked rice', 'chawal', 'jeera rice'] },
  { id: 'lentils', name: 'Yellow Lentils (Dal)', category: 'grains', emoji: '🥣', aliases: ['dal', 'daal', 'yellow lentils', 'moong dal', 'toor dal', 'masoor dal', 'red lentils', 'dahl'] },
  { id: 'bread', name: 'Bread', category: 'grains', emoji: '🍞', aliases: ['white bread', 'sourdough', 'whole wheat bread', 'toast', 'baguette', 'buns', 'pav', 'sandwich bread'] },
  { id: 'flour', name: 'All-Purpose Flour / Atta', category: 'grains', emoji: '🌾', aliases: ['flour', 'wheat flour', 'atta', 'maida', 'plain flour', 'baking flour', 'roti flour'] },
  { id: 'oats', name: 'Rolled Oats', category: 'grains', emoji: '🥣', aliases: ['oats', 'oatmeal', 'quick oats'] },
  { id: 'tortillas', name: 'Tortillas', category: 'grains', emoji: '🫓', aliases: ['flour tortillas', 'corn tortillas', 'wraps', 'flatbread', 'roti', 'chapati'] },
  { id: 'breadcrumbs', name: 'Breadcrumbs', category: 'grains', emoji: '🍞', aliases: ['panko', 'panko breadcrumbs', 'bread crumbs'] },
  { id: 'quinoa', name: 'Quinoa', category: 'grains', emoji: '🥣', aliases: ['white quinoa', 'cooked quinoa'] },
  { id: 'noodles', name: 'Noodles', category: 'grains', emoji: '🍜', aliases: ['ramen noodles', 'egg noodles', 'rice noodles', 'soba'] },

  // --- EGGS ---
  { id: 'eggs', name: 'Eggs', category: 'eggs', emoji: '🥚', aliases: ['egg', 'egg yolks', 'egg whites', 'large eggs'] },

  // --- MEAT & POULTRY ---
  { id: 'chicken', name: 'Chicken Breast', category: 'meat', emoji: '🍗', aliases: ['chicken', 'chicken thighs', 'boneless chicken', 'diced chicken', 'ground chicken'] },
  { id: 'ground-beef', name: 'Ground Beef', category: 'meat', emoji: '🥩', aliases: ['mince', 'beef mince', 'ground meat', 'beef'] },
  { id: 'bacon', name: 'Bacon', category: 'meat', emoji: '🥓', aliases: ['bacon strips', 'pancetta', 'turkey bacon'] },
  { id: 'sausage', name: 'Sausages', category: 'meat', emoji: '🌭', aliases: ['sausage', 'chorizo', 'italian sausage', 'frankfurters'] },
  { id: 'pork', name: 'Pork Chops', category: 'meat', emoji: '🥩', aliases: ['pork', 'tenderloin', 'pork tenderloin'] },

  // --- SEAFOOD ---
  { id: 'shrimp', name: 'Shrimp', category: 'seafood', emoji: '🦐', aliases: ['prawns', 'peeled shrimp', 'frozen shrimp'] },
  { id: 'salmon', name: 'Salmon Fillet', category: 'seafood', emoji: '🐟', aliases: ['salmon', 'fish', 'fish fillet'] },
  { id: 'fish', name: 'Fish Fillet', category: 'seafood', emoji: '🐟', aliases: ['fish', 'fish fillet', 'white fish', 'cod', 'tilapia', 'pomfret', 'rohu', 'surmai'] },
  { id: 'tuna', name: 'Canned Tuna', category: 'seafood', emoji: '🐟', aliases: ['tuna', 'tuna in oil', 'tuna in water'] },

  // --- SPICES & HERBS ---
  { id: 'black-pepper', name: 'Black Pepper', category: 'spices', emoji: '🧂', aliases: ['pepper', 'cracked black pepper', 'ground pepper'], isPantryStaple: true },
  { id: 'salt', name: 'Salt', category: 'spices', emoji: '🧂', aliases: ['sea salt', 'kosher salt', 'table salt'], isPantryStaple: true },
  { id: 'red-pepper-flakes', name: 'Red Pepper Flakes', category: 'spices', emoji: '🌶️', aliases: ['chilli flakes', 'crushed red pepper', 'red chili flakes'] },
  { id: 'basil', name: 'Fresh Basil', category: 'spices', emoji: '🌿', aliases: ['basil', 'basil leaves', 'dried basil'] },
  { id: 'parsley', name: 'Parsley', category: 'spices', emoji: '🌿', aliases: ['fresh parsley', 'flat leaf parsley', 'dried parsley'] },
  { id: 'oregano', name: 'Dried Oregano', category: 'spices', emoji: '🌿', aliases: ['oregano', 'italian seasoning'] },
  { id: 'cumin', name: 'Ground Cumin', category: 'spices', emoji: '🌱', aliases: ['cumin', 'cumin powder', 'jeera'] },
  { id: 'coriander-fresh', name: 'Fresh Cilantro', category: 'spices', emoji: '🌿', aliases: ['cilantro', 'coriander leaves', 'fresh coriander'] },
  { id: 'paprika', name: 'Paprika', category: 'spices', emoji: '🌶️', aliases: ['smoked paprika', 'sweet paprika'] },
  { id: 'turmeric', name: 'Turmeric Powder', category: 'spices', emoji: '💛', aliases: ['turmeric', 'haldi'] },
  { id: 'garam-masala', name: 'Garam Masala', category: 'spices', emoji: '✨', aliases: ['garam masala powder', 'all spice'] },
  { id: 'cinnamon', name: 'Cinnamon', category: 'spices', emoji: '🪵', aliases: ['ground cinnamon', 'cinnamon powder', 'cinnamon stick'] },

  // --- PANTRY BASICS ---
  { id: 'olive-oil', name: 'Olive Oil', category: 'pantry', emoji: '🫒', aliases: ['extra virgin olive oil', 'cooking oil', 'oil', 'vegetable oil'], isPantryStaple: true },
  { id: 'sugar', name: 'Sugar', category: 'pantry', emoji: '🍬', aliases: ['granulated sugar', 'white sugar', 'brown sugar'], isPantryStaple: true },
  { id: 'honey', name: 'Honey', category: 'pantry', emoji: '🍯', aliases: ['pure honey', 'maple syrup'] },
  { id: 'baking-powder', name: 'Baking Powder', category: 'pantry', emoji: '🥄', aliases: ['baking soda', 'leavener'] },
  { id: 'vanilla', name: 'Vanilla Extract', category: 'pantry', emoji: '🧴', aliases: ['vanilla essence', 'pure vanilla'] },
  { id: 'canned-beans', name: 'Black Beans / Chickpeas', category: 'pantry', emoji: '🥫', aliases: ['black beans', 'chickpeas', 'garbanzo', 'kidney beans', 'canned chickpeas'] },
  { id: 'canned-tomatoes', name: 'Canned Crushed Tomatoes', category: 'pantry', emoji: '🥫', aliases: ['crushed tomatoes', 'canned plum tomatoes', 'passata'] },
  { id: 'vegetable-broth', name: 'Broth / Stock', category: 'pantry', emoji: '🍲', aliases: ['chicken broth', 'vegetable broth', 'chicken stock', 'bouillon'] },

  // --- SAUCES & CONDIMENTS ---
  { id: 'soy-sauce', name: 'Soy Sauce', category: 'sauces', emoji: '🥢', aliases: ['dark soy sauce', 'light soy sauce', 'tamari'] },
  { id: 'tomato-sauce', name: 'Tomato Paste / Sauce', category: 'sauces', emoji: '🥫', aliases: ['tomato paste', 'marinara', 'pasta sauce'] },
  { id: 'mayonnaise', name: 'Mayonnaise', category: 'sauces', emoji: '🥚', aliases: ['mayo', 'kewpie mayo'] },
  { id: 'hot-sauce', name: 'Hot Sauce / Sriracha', category: 'sauces', emoji: '🌶️', aliases: ['sriracha', 'chili sauce', 'tabasco'] },
  { id: 'sesame-oil', name: 'Toasted Sesame Oil', category: 'sauces', emoji: '🫗', aliases: ['sesame oil'] },
  { id: 'mustard', name: 'Dijon Mustard', category: 'sauces', emoji: '🌭', aliases: ['mustard', 'yellow mustard', 'wholegrain mustard'] },
  { id: 'vinegar', name: 'Vinegar', category: 'sauces', emoji: '🍾', aliases: ['apple cider vinegar', 'rice vinegar', 'white vinegar', 'balsamic vinegar'] },
  { id: 'peanut-butter', name: 'Peanut Butter', category: 'sauces', emoji: '🥜', aliases: ['creamy peanut butter', 'almond butter'] },

  // --- OTHER ---
  { id: 'tofu', name: 'Firm Tofu', category: 'other', emoji: '🧊', aliases: ['tofu', 'silken tofu', 'bean curd'] },
  { id: 'nuts', name: 'Nuts (Walnuts / Almonds)', category: 'other', emoji: '🥜', aliases: ['almonds', 'walnuts', 'peanuts', 'cashews', 'pine nuts'] },
  { id: 'chocolate', name: 'Dark Chocolate / Chips', category: 'other', emoji: '🍫', aliases: ['chocolate chips', 'cocoa powder', 'baking chocolate'] },
];
