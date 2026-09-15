# 🍳 What's In My Fridge?

> **"What can you make with what you already have?"**  
> A portfolio-quality, modern recipe discovery web application that turns kitchen leftovers and pantry staples into restaurant-quality meals with zero grocery store stress and zero food waste.

🔗 **Live Demo**: [https://whats-in-my-fridge.surge.sh](https://whats-in-my-fridge.surge.sh)

---

## ✨ Features

- **Smart Recipe Matching Engine**:
  - Calculates live percentage match scores (e.g., *100% Ready*, *86% Match*).
  - Clearly differentiates **"You Have"** (in your fridge) from **"Missing"** ingredients.
  - Accounts for basic pantry staples (salt, black pepper, cooking oil, sugar).
  - Intelligent alias resolution (e.g., "penne" or "spaghetti" matches "pasta").
  - Multi-tier intelligent sorting: Best Match First, Quickest Cook Time, Fewest Missing Items.

- **Visual Ingredient Inventory**:
  - 80+ categorized ingredients (Vegetables, Fruits, Dairy, Grains, Meat, Seafood, Eggs, Spices, Pantry, Sauces).
  - 1-click quick-add everyday staples bar.
  - Instant fuzzy search with auto-complete.
  - Custom ingredient input for any unlisted item.
  - Live count pill (*"6 ingredients selected"*).

- **"Have a Messy Fridge? Take a Photo" (Visual Scanner Demo)**:
  - Simulated client-side computer vision scanner with zero external cloud dependencies.
  - Try out 3 realistic sample fridge photos or upload your own photo.
  - Laser scan animation and bounding boxes with confidence percentages.
  - Interactive review checklist to toggle and import detected items directly into your fridge.

- **Dynamic Preferences & Dietary Filters**:
  - Dietary restrictions: Anything, Vegetarian, Vegan, Egg-Free, Dairy-Free, Gluten-Free.
  - Cooking time: Under 15m, Under 30m, Under 60m, Any Time.
  - Skill level: Easy, Medium, Advanced.
  - Meal type: Breakfast, Lunch, Dinner, Snack, Dessert.
  - Spice level: Mild, Medium, Spicy.
  - "Assume basic pantry staples" toggle.

- **Recipe Detail & Dynamic Servings Scaler**:
  - High-resolution food photography.
  - Servings scaler (`-` / `+`) that recalculates ingredient quantities in real time.
  - Prep checklist with checkboxes.
  - Macros & calorie breakdowns.
  - Detailed step-by-step instructions.

- **Dedicated Hands-Free Cooking Mode**:
  - Distraction-free full-screen interface designed for reading across kitchen counters.
  - Step counter (*"Step 2 of 5"*) with previous / next buttons and keyboard navigation (← / → arrows).
  - Built-in interactive kitchen timers for timed steps with Web Audio API bell chimes (100% offline).
  - Collapsible ingredient quick-reference drawer.
  - Confetti celebration upon completion and auto-records to your **Cooked History** with star ratings.

- **Culinary Ingredient Substitutions Guide**:
  - Science-backed kitchen substitutions with exact ratios and explanations of *why each swap works*.
  - Inline substitution recommendations wherever a missing ingredient appears.
  - Dedicated encyclopedia for popular staples (heavy cream, butter, parmesan, eggs, soy sauce, etc.).

- **Surprise Me 🎲 Roulette**:
  - Playful animated slot-machine shuffle that recommends a dish from your currently available ingredients.
  - Direct *"Let's Cook!"* launcher and *"Spin Again"* option.

- **Client-Side Persistence & Zero-Setup**:
  - Remembers selected fridge items, preferences, saved favorites, and cooking history via `localStorage`.
  - No authentication, login, or cloud database setup required.

---

## 🛠️ Technology Stack

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 8](https://vitejs.dev/) with `@tailwindcss/vite`
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + Custom typography (`Fraunces` editorial serif & `Plus Jakarta Sans`)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Celebration Effects**: `canvas-confetti`
- **Audio Chimes**: Native Web Audio API synthesized chimes (zero external audio file dependencies)
- **Testing**: `tsx` + Native Node Assertion test suite

---

## 🚀 Getting Started

### 1. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 2. Run the Development Server
\`\`\`bash
npm run dev
\`\`\`
The application will be running at \`http://localhost:5173\`.

### 3. Run Automated Tests
\`\`\`bash
npm test
\`\`\`
Runs the comprehensive 8-step test suite covering recipe data integrity, ingredient alias mapping, matching algorithms, substitutions, and dietary filter accuracy.

### 4. Build for Production
\`\`\`bash
npm run build
\`\`\`
Compiles optimized production bundle into \`dist/\`.

---

## 📁 Architecture Overview

\`\`\`
src/
├── types/                # TypeScript interfaces (Recipe, Ingredient, MatchResult, etc.)
├── data/
│   ├── ingredientsData.ts # 84+ categorized items, aliases, emojis, pantry flags
│   ├── recipesData.ts     # 30 curated recipes with steps, timers, macros, and tags
│   └── substitutionsData.ts # Culinary substitution matrix with scientific rationales
├── services/
│   ├── matchingEngine.ts  # Matching score calculation, ranking, dietary filters
│   └── storageService.ts  # LocalStorage persistence wrapper for fridge & history
├── utils/
│   ├── audioAlert.ts      # Web Audio API chime generator for cooking timers
│   ├── formatters.ts      # Relative timestamp & fraction formatting
│   └── imageFallback.ts   # Safe fallback SVG illustration handler
└── components/
    ├── Navbar.tsx             # Responsive header & mobile bottom navigation
    ├── LandingHero.tsx        # Hero section with live interactive cooking demo
    ├── IngredientSelector.tsx # Kitchen inventory picker & custom adder
    ├── FridgeScannerModal.tsx # Simulated photo vision scanner demo
    ├── PreferencesFilter.tsx  # Dietary, cook time, and meal preferences
    ├── RecipeCard.tsx         # Recipe card with live match badge & tags
    ├── RecipeDiscovery.tsx    # Ranked recipe grid & recovery empty states
    ├── RecipeDetailModal.tsx  # Dynamic serving scaler & ingredient checklist
    ├── CookingModeModal.tsx   # Hands-free full-screen cooking mode & timers
    ├── SurpriseMeModal.tsx    # Animated roulette recipe selector
    ├── SubstitutionsGuideModal.tsx # Searchable swaps encyclopedia
    ├── FavoritesView.tsx      # Saved favorite recipes
    ├── RecentlyCookedView.tsx # Cooking history & star rating log
    └── Footer.tsx             # Editorial footer with quick links
\`\`\`
