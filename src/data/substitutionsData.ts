import { IngredientSubstitute, SubstitutionGuideItem } from '../types';

export const SUBSTITUTIONS_DATABASE: SubstitutionGuideItem[] = [
  {
    ingredient: 'Heavy Cream',
    category: 'Dairy',
    substitutes: [
      {
        name: 'Whole Milk + Melted Butter',
        ratio: '3/4 cup milk + 1/4 cup melted butter = 1 cup heavy cream',
        description: 'Blends milk fats with butter fat to match the viscosity and richness of heavy cream.',
        whyItWorks: 'Heavy cream is roughly 36% butterfat. Combining whole milk (3.5%) with butter (80%) creates an emulsion with identical fat ratio suitable for sauces and soups.',
        tags: ['Sauces', 'Soups', 'Pasta'],
      },
      {
        name: 'Greek Yogurt + Milk',
        ratio: '1:1 ratio equal parts yogurt and milk',
        description: 'Whisk until completely smooth. Adds a velvety body with a slight pleasant tang.',
        whyItWorks: 'High protein and thick texture simulate the coating power of cream on pasta and in pan sauces without scorching.',
        tags: ['Pasta', 'Curries', 'Low-Fat'],
      },
      {
        name: 'Full-Fat Coconut Milk or Cream',
        ratio: '1:1 direct swap',
        description: 'The solid cream at the top of a chilled can provides luxurious richness.',
        whyItWorks: 'Naturally matches the rich mouthfeel and thickness of dairy cream, with a subtle nutty profile that shines in curries, soups, and bakes.',
        tags: ['Dairy-Free', 'Vegan', 'Curries'],
      },
    ],
  },
  {
    ingredient: 'Parmesan Cheese',
    category: 'Dairy',
    substitutes: [
      {
        name: 'Pecorino Romano or Grana Padano',
        ratio: '1:1 direct swap (use slightly less Pecorino as it is saltier)',
        description: 'Hard, aged Italian cheeses with deep umami and sharp savory bite.',
        whyItWorks: 'Shares the same crystallized tyrosine texture and intense salty savoriness produced by long aging.',
        tags: ['Pasta', 'Salads', 'Soups'],
      },
      {
        name: 'Nutritional Yeast',
        ratio: '1:1 ratio with a pinch of sea salt',
        description: 'Golden savory flakes packed with natural nutty, cheesy umami.',
        whyItWorks: 'Provides the same deep glutamic acid savoriness and cheesy flavor profile while remaining 100% plant-based and dairy-free.',
        tags: ['Vegan', 'Dairy-Free', 'Healthy'],
      },
      {
        name: 'Aged White Cheddar or Asiago',
        ratio: '1:1 finely grated',
        description: 'Sharp, dry aged cheddar grated very fine on a microplane.',
        whyItWorks: 'Brings sharp tang, deep savoriness, and melts smoothly into warm dishes.',
        tags: ['Melting', 'Pasta', 'Topping'],
      },
    ],
  },
  {
    ingredient: 'Butter',
    category: 'Dairy',
    substitutes: [
      {
        name: 'Extra Virgin Olive Oil',
        ratio: '3/4 tbsp olive oil for every 1 tbsp butter',
        description: 'Fruitful, rich aromatic oil ideal for sautéing, pasta, and rustic baking.',
        whyItWorks: 'Pure healthy monounsaturated fat provides smooth mouthfeel and resists burning better than whole dairy butter.',
        tags: ['Sautéing', 'Dairy-Free', 'Vegan'],
      },
      {
        name: 'Ghee (Clarified Butter)',
        ratio: '1:1 direct swap',
        description: 'Butter with milk solids simmered off, boasting a nutty, caramelized aroma.',
        whyItWorks: 'Higher smoke point (485°F) with rich butter flavor; virtually lactose-free.',
        tags: ['High Heat', 'Curries', 'Sautéing'],
      },
      {
        name: 'Coconut Oil (Refined or Virgin)',
        ratio: '1:1 direct swap for baking',
        description: 'Solid at room temperature just like chilled butter.',
        whyItWorks: 'Mimics the crumb structure in cookies, pastries, and skillet cooking.',
        tags: ['Vegan', 'Baking'],
      },
    ],
  },
  {
    ingredient: 'Eggs (in Baking)',
    category: 'Baking',
    substitutes: [
      {
        name: 'Flax Egg (Ground Flax + Water)',
        ratio: '1 tbsp ground flaxseed + 3 tbsp water = 1 egg (let rest 5 min)',
        description: 'Forms a gelatinous mixture with binding power identical to egg whites.',
        whyItWorks: 'Mucilage fibers in flax expand in water, creating elasticity that binds flour structures together.',
        tags: ['Baking', 'Vegan', 'Pancakes'],
      },
      {
        name: 'Unsweetened Applesauce or Mashed Banana',
        ratio: '1/4 cup (60g) = 1 egg',
        description: 'Adds moisture and tender pectin structure to muffins, brownies, and quick breads.',
        whyItWorks: 'Natural pectin binds liquids and starches, retaining moist, soft crumb structure.',
        tags: ['Pancakes', 'Quick Breads', 'Vegan'],
      },
      {
        name: 'Plain Greek Yogurt',
        ratio: '1/4 cup = 1 egg',
        description: 'Imparts moisture, gentle acidity, and protein density.',
        whyItWorks: 'Proteins set upon heating while acid tenderizes gluten for tender cakes.',
        tags: ['Cakes', 'Muffins'],
      },
    ],
  },
  {
    ingredient: 'Garlic (Fresh Cloves)',
    category: 'Aromatics',
    substitutes: [
      {
        name: 'Garlic Powder',
        ratio: '1/8 to 1/4 tsp garlic powder = 1 fresh clove',
        description: 'Concentrated dehydrated garlic that disperses evenly throughout sauces.',
        whyItWorks: 'Contains allicin precursors dried at peak flavor, providing clean savory warmth.',
        tags: ['Seasoning', 'Dry Rubs', 'Quick'],
      },
      {
        name: 'Shallots or Leeks',
        ratio: '1 minced shallot = 2-3 garlic cloves',
        description: 'Aromatic allium with sweet, subtle garlicky undertones.',
        whyItWorks: 'Belongs to the allium family; browns gently without acrid bitterness.',
        tags: ['Sautéing', 'Pan Sauces', 'Gourmet'],
      },
      {
        name: 'Chives or Garlic Chives',
        ratio: '1 tbsp chopped chives = 1 clove',
        description: 'Fresh green herb with delicate garlic flavor.',
        whyItWorks: 'Adds a burst of allium freshness best folded in toward the end of cooking.',
        tags: ['Finishing', 'Eggs', 'Potatoes'],
      },
    ],
  },
  {
    ingredient: 'Soy Sauce',
    category: 'Condiments',
    substitutes: [
      {
        name: 'Tamari',
        ratio: '1:1 direct swap',
        description: 'Traditional Japanese soy sauce made with little or no wheat; naturally gluten-free.',
        whyItWorks: 'Deeper, rounder umami richness with virtually identical salt and savoriness.',
        tags: ['Gluten-Free', 'Stir-Fry', 'Marinades'],
      },
      {
        name: 'Coconut Aminos',
        ratio: '1:1 swap + add a pinch of sea salt',
        description: 'Sap from coconut blossoms aged with sea salt; slightly sweeter.',
        whyItWorks: 'Delivers savory amino acids and brown caramel hue without soy or gluten.',
        tags: ['Soy-Free', 'Paleo', 'Sweet-Savory'],
      },
      {
        name: 'Worcestershire Sauce + Water',
        ratio: '1 tsp Worcestershire + 1 tsp water = 1 tbsp soy sauce',
        description: 'Fermented complex sauce with tamarind, anchovy, and vinegar.',
        whyItWorks: 'Rich in savory fermented umami and darkness for stews and gravies.',
        tags: ['Emergency', 'Stews', 'Meats'],
      },
    ],
  },
  {
    ingredient: 'Breadcrumbs',
    category: 'Pantry',
    substitutes: [
      {
        name: 'Crushed Crackers / Ritz / Saltines',
        ratio: '1:1 direct swap',
        description: 'Crunchy, slightly buttery pre-baked crisps crushed with a rolling pin.',
        whyItWorks: 'Toasted starch structure crisps gorgeously under heat, absorbing juices while retaining crunch.',
        tags: ['Breading', 'Meatballs', 'Casseroles'],
      },
      {
        name: 'Rolled Oats (pulsed in blender)',
        ratio: '1:1 swap',
        description: 'Whizzed rolled oats create coarse, fibrous crumbs that bind liquids.',
        whyItWorks: 'Oat beta-glucans trap moisture in burgers and meatballs, preventing dryness.',
        tags: ['Meatballs', 'Gluten-Free Option', 'Healthy'],
      },
      {
        name: 'Toasted Stale Bread (Homemade)',
        ratio: '1:1 swap',
        description: 'Grind dry or toasted bread crusts in a processor with herbs and pinch of salt.',
        whyItWorks: 'Authentic rustic breadcrumb with superior crunch and aroma to packaged varieties.',
        tags: ['Zero-Waste', 'Breading', 'Pasta Topping'],
      },
    ],
  },
  {
    ingredient: 'Chicken Breast',
    category: 'Protein',
    substitutes: [
      {
        name: 'Extra Firm Tofu (pressed & cubed)',
        ratio: '1:1 weight equivalent',
        description: 'Pressed soybean curd that crisps on the edges and absorbs sauces like a sponge.',
        whyItWorks: 'Comparable chew and neutral flavor canvas that mirrors chicken in stir-fries, curries, and bowls.',
        tags: ['Vegetarian', 'Vegan', 'High-Protein'],
      },
      {
        name: 'Paneer Cubes',
        ratio: '1:1 weight equivalent',
        description: 'Indian fresh non-melting farmer cheese that sears golden on the outside.',
        whyItWorks: 'Dense, satisfying toothsome bite that stays firm when simmered in spiced gravies.',
        tags: ['Vegetarian', 'Curries', 'Tikka'],
      },
      {
        name: 'Portobello or Cremini Mushrooms',
        ratio: '1:1 equivalent in stir-fries and pasta',
        description: 'Meaty, rich fungi with high natural glutamate levels.',
        whyItWorks: 'Spongy cellular walls caramelize during high heat searing, imparting deep savory chew.',
        tags: ['Vegetarian', 'Earthy', 'Low-Calorie'],
      },
    ],
  },
  {
    ingredient: 'All-Purpose Flour',
    category: 'Grains',
    substitutes: [
      {
        name: '1-to-1 Gluten-Free Flour Blend',
        ratio: '1:1 direct swap',
        description: 'Commercial rice, potato starch, and xanthan gum blend.',
        whyItWorks: 'Engineered starch ratios mimic gluten matrix elasticity in cookies, roux, and pancakes.',
        tags: ['Gluten-Free', 'Baking', 'Sauces'],
      },
      {
        name: 'Cornstarch (for thickening sauces)',
        ratio: '1 tbsp cornstarch = 2 tbsp all-purpose flour',
        description: 'Pure refined corn endosperm starch with double the gelatinization power.',
        whyItWorks: 'Gelatinizes at lower temperatures and produces glossy, translucent sauces without flour taste.',
        tags: ['Thickening', 'Soups', 'Stir-Fry'],
      },
      {
        name: 'Rolled Oat Flour (blended oats)',
        ratio: '1:1 by weight for pancakes and cookies',
        description: 'Finely ground whole grain oats providing gentle nutty aroma.',
        whyItWorks: 'High absorbency and pleasant crumb for quick breads, waffles, and cookies.',
        tags: ['Healthy', 'Breakfast', 'Pancakes'],
      },
    ],
  },
  {
    ingredient: 'Milk',
    category: 'Dairy',
    substitutes: [
      {
        name: 'Oat Milk or Almond Milk',
        ratio: '1:1 direct swap (use unsweetened, unflavored)',
        description: 'Plant milk with neutral flavor and creamy suspension.',
        whyItWorks: 'Oat milk has natural starches that emulsify warmly into sauces, baking, and soups.',
        tags: ['Vegan', 'Dairy-Free', 'Baking'],
      },
      {
        name: 'Water + Butter',
        ratio: '1 cup water + 1 tbsp melted butter = 1 cup whole milk',
        description: 'Provides hydration plus butterfat in baking and pancake batters.',
        whyItWorks: 'Reconstitutes the liquid and fat ratio needed to hydrate dry starches.',
        tags: ['Emergency', 'Baking', 'Pancakes'],
      },
      {
        name: 'Evaporated Milk + Water',
        ratio: '1/2 cup evaporated milk + 1/2 cup water = 1 cup milk',
        description: 'Shelf-stable concentrated milk with cooked sweetness and rich body.',
        whyItWorks: 'Sterilized dairy milk with reduced water content; rehydrates seamlessly.',
        tags: ['Pantry', 'Sauces', 'Baking'],
      },
    ],
  },
  {
    ingredient: 'Tomato Paste / Canned Tomatoes',
    category: 'Pantry',
    substitutes: [
      {
        name: 'Fresh Grated Ripe Tomatoes + Simmer',
        ratio: '2 large grated tomatoes simmered 8 min = 1/2 cup canned tomato sauce',
        description: 'Fresh tomatoes grated directly against skin, reducing to rich pulpy purée.',
        whyItWorks: 'Natural pectin and tomato sugars concentrate with heat into bright savory sugo.',
        tags: ['Fresh', 'Italian', 'Zero-Waste'],
      },
      {
        name: 'Ketchup + Pinch of Vinegar & Red Pepper',
        ratio: '1 tbsp ketchup = 1 tbsp tomato paste (reduce added sugar elsewhere)',
        description: 'Concentrated tomato reduction seasoned with vinegar and sugar.',
        whyItWorks: 'Emergency acidic-sweet tomato base for curries, chili, or quick barbecue glazes.',
        tags: ['Quick Fix', 'Curries', 'Stews'],
      },
    ],
  },
  {
    ingredient: 'Rice',
    category: 'Grains',
    substitutes: [
      {
        name: 'Cauliflower Rice',
        ratio: '1:1 direct swap',
        description: 'Raw cauliflower florets pulsed to rice grain size, sautéed 4-5 minutes.',
        whyItWorks: 'Light, tender grain-free base that absorbs seasonings and sauces beautifully with 90% fewer carbs.',
        tags: ['Low-Carb', 'Keto', 'Vegetable-Packed'],
      },
      {
        name: 'Quinoa or Couscous',
        ratio: '1:1 swap',
        description: 'Tender fluffy grains cooked in 12-15 minutes.',
        whyItWorks: 'Fluffy texture, high protein, and exceptional sauce-holding capacity.',
        tags: ['High-Protein', 'Bowls', 'Salads'],
      },
      {
        name: 'Diced Roasted Potatoes',
        ratio: '1:1 swap',
        description: 'Golden, crispy potato cubes serving as a hearty carbohydrate foundation.',
        whyItWorks: 'Starchy base that pairs naturally with curries, grilled meats, and stir-fry veggies.',
        tags: ['Hearty', 'Gluten-Free'],
      },
    ],
  },
];

/**
 * Helper to look up substitution options for an ingredient name
 */
export function findSubstitutionsFor(ingredientName: string): IngredientSubstitute[] | null {
  const normalized = ingredientName.toLowerCase().trim();
  
  for (const item of SUBSTITUTIONS_DATABASE) {
    if (
      item.ingredient.toLowerCase() === normalized ||
      item.ingredient.toLowerCase().includes(normalized) ||
      normalized.includes(item.ingredient.toLowerCase())
    ) {
      return item.substitutes;
    }
  }

  // Keyword check
  if (normalized.includes('cream') || normalized.includes('whipping')) {
    return SUBSTITUTIONS_DATABASE.find(s => s.ingredient === 'Heavy Cream')?.substitutes || null;
  }
  if (normalized.includes('parmesan') || normalized.includes('pecorino')) {
    return SUBSTITUTIONS_DATABASE.find(s => s.ingredient === 'Parmesan Cheese')?.substitutes || null;
  }
  if (normalized.includes('butter') || normalized.includes('ghee')) {
    return SUBSTITUTIONS_DATABASE.find(s => s.ingredient === 'Butter')?.substitutes || null;
  }
  if (normalized.includes('egg')) {
    return SUBSTITUTIONS_DATABASE.find(s => s.ingredient.includes('Eggs'))?.substitutes || null;
  }
  if (normalized.includes('garlic')) {
    return SUBSTITUTIONS_DATABASE.find(s => s.ingredient.includes('Garlic'))?.substitutes || null;
  }
  if (normalized.includes('soy sauce')) {
    return SUBSTITUTIONS_DATABASE.find(s => s.ingredient === 'Soy Sauce')?.substitutes || null;
  }
  if (normalized.includes('chicken')) {
    return SUBSTITUTIONS_DATABASE.find(s => s.ingredient === 'Chicken Breast')?.substitutes || null;
  }
  if (normalized.includes('milk')) {
    return SUBSTITUTIONS_DATABASE.find(s => s.ingredient === 'Milk')?.substitutes || null;
  }
  if (normalized.includes('flour')) {
    return SUBSTITUTIONS_DATABASE.find(s => s.ingredient.includes('Flour'))?.substitutes || null;
  }
  if (normalized.includes('tomato')) {
    return SUBSTITUTIONS_DATABASE.find(s => s.ingredient.includes('Tomato'))?.substitutes || null;
  }
  if (normalized.includes('rice')) {
    return SUBSTITUTIONS_DATABASE.find(s => s.ingredient === 'Rice')?.substitutes || null;
  }

  return null;
}
