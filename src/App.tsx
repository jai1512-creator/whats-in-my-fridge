import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { LandingHero } from './components/LandingHero';
import { IngredientSelector } from './components/IngredientSelector';
import { RecipeDiscovery } from './components/RecipeDiscovery';
import { RecipeDetailModal } from './components/RecipeDetailModal';
import { CookingModeModal } from './components/CookingModeModal';
import { SurpriseMeModal } from './components/SurpriseMeModal';
import { FridgeScannerModal } from './components/FridgeScannerModal';
import { SubstitutionsGuideModal } from './components/SubstitutionsGuideModal';
import { FavoritesView } from './components/FavoritesView';
import { RecentlyCookedView } from './components/RecentlyCookedView';
import { Footer } from './components/Footer';
import { handleImageError } from './utils/imageFallback';

import { RECIPES_DATABASE } from './data/recipesData';
import { INGREDIENTS_DATABASE } from './data/ingredientsData';
import { calculateRecipeMatch, getRankedRecipes } from './services/matchingEngine';
import { storageService, DEFAULT_PREFERENCES } from './services/storageService';
import {
  ActiveTab,
  DietaryFilter,
  FridgeItem,
  IngredientCategory,
  RecentlyCookedItem,
  RecipeMatch,
  UserPreferences,
} from './types';

export function App() {
  // Persistent State
  const [fridgeItems, setFridgeItems] = useState<FridgeItem[]>(() => storageService.getFridgeItems());
  const [preferences, setPreferences] = useState<UserPreferences>(() => storageService.getPreferences());
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => storageService.getFavorites());
  const [recentlyCooked, setRecentlyCooked] = useState<RecentlyCookedItem[]>(() => storageService.getRecentlyCooked());

  // UI Navigation & Filters
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'best-match' | 'quickest' | 'fewest-missing'>('best-match');

  // Modal States
  const [selectedRecipeMatch, setSelectedRecipeMatch] = useState<RecipeMatch | null>(null);
  const [cookingRecipeMatch, setCookingRecipeMatch] = useState<RecipeMatch | null>(null);
  const [isSurpriseMeOpen, setIsSurpriseMeOpen] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isSubstitutionsModalOpen, setIsSubstitutionsModalOpen] = useState(false);
  const [substitutionsInitialQuery, setSubstitutionsInitialQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Persist fridge items whenever they change
  useEffect(() => {
    storageService.saveFridgeItems(fridgeItems);
  }, [fridgeItems]);

  // Persist preferences whenever they change
  useEffect(() => {
    storageService.savePreferences(preferences);
  }, [preferences]);

  // Fast set of user ingredient IDs
  const userIngredientIds = useMemo(() => {
    const ids = new Set<string>();
    for (const item of fridgeItems) {
      ids.add(item.id);
      // Map name to ID if found in database
      const match = INGREDIENTS_DATABASE.find(
        ing => ing.name.toLowerCase() === item.name.toLowerCase()
      );
      if (match) ids.add(match.id);
    }
    return ids;
  }, [fridgeItems]);

  // Compute ranked recipe matches based on current fridge items and preferences
  const rankedRecipes = useMemo(() => {
    return getRankedRecipes(RECIPES_DATABASE, userIngredientIds, preferences, searchQuery, sortBy);
  }, [userIngredientIds, preferences, searchQuery, sortBy]);

  // Compute favorite matches with live fridge recalculations
  const favoriteMatches = useMemo(() => {
    const favoriteSet = new Set(favoriteIds);
    const favoriteList = RECIPES_DATABASE.filter(r => favoriteSet.has(r.id));
    return favoriteList.map(recipe =>
      calculateRecipeMatch(recipe, userIngredientIds, preferences.assumePantryStaples)
    );
  }, [favoriteIds, userIngredientIds, preferences.assumePantryStaples]);

  // Ingredient Handlers
  const handleAddIngredient = (
    name: string,
    category: IngredientCategory = 'other',
    emoji: string = '🥕'
  ) => {
    const trimmed = name.trim();
    if (!trimmed) return;

    // Check if ingredient is already in fridge
    const alreadyExists = fridgeItems.some(
      item => item.name.toLowerCase() === trimmed.toLowerCase()
    );
    if (alreadyExists) return;

    // Check if in database to borrow its canonical category & emoji
    const dbItem = INGREDIENTS_DATABASE.find(
      i =>
        i.name.toLowerCase() === trimmed.toLowerCase() ||
        i.aliases.some(a => a.toLowerCase() === trimmed.toLowerCase())
    );

    const newItem: FridgeItem = {
      id: dbItem ? dbItem.id : trimmed.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      name: dbItem ? dbItem.name : trimmed,
      category: dbItem ? dbItem.category : category,
      emoji: dbItem ? dbItem.emoji : emoji,
      addedAt: Date.now(),
    };

    setFridgeItems(prev => [newItem, ...prev]);
  };

  const handleRemoveIngredient = (id: string) => {
    setFridgeItems(prev => prev.filter(item => item.id !== id));
  };

  const handleClearAllIngredients = () => {
    storageService.clearFridge();
    setFridgeItems([]);
    showToast('🗑️ Fridge emptied. Add what you have in your kitchen!');
  };

  const handleAddDetectedIngredients = (
    items: { name: string; category: IngredientCategory; emoji: string }[],
    dietaryChoice: DietaryFilter = 'all'
  ) => {
    items.forEach(item => {
      handleAddIngredient(item.name, item.category, item.emoji);
    });
    if (dietaryChoice !== 'all') {
      setPreferences(prev => ({ ...prev, dietary: dietaryChoice }));
    }
    // Auto navigate directly to discover tab so users see their dishes immediately!
    setActiveTab('discover');
    showToast(
      `✨ Added ${items.length} ingredients from fridge photo! Showing ${
        dietaryChoice === 'vegetarian'
          ? 'Pure Vegetarian'
          : dietaryChoice === 'non-vegetarian'
          ? 'Non-Vegetarian'
          : 'matching'
      } dishes.`
    );
  };

  // Preference Handlers
  const handleUpdatePreferences = (updated: Partial<UserPreferences>) => {
    setPreferences(prev => ({ ...prev, ...updated }));
  };

  const handleResetPreferences = () => {
    setPreferences(DEFAULT_PREFERENCES);
    setSearchQuery('');
    showToast('✓ Filters cleared (showing all recipes)');
  };

  const handleResetFridge = () => {
    const freshStaples = storageService.resetFridgeToStarter();
    setFridgeItems([...freshStaples]);
    setPreferences(DEFAULT_PREFERENCES);
    setSearchQuery('');
    showToast('✨ Fridge reset to basic items (Milk & Bread) & filters cleared!');
  };

  // Favorite Handlers
  const handleToggleFavorite = (e: React.MouseEvent, recipeId: string) => {
    e.stopPropagation();
    const updated = storageService.toggleFavorite(recipeId);
    setFavoriteIds(updated);
  };

  const handleToggleFavoriteById = (recipeId: string) => {
    const updated = storageService.toggleFavorite(recipeId);
    setFavoriteIds(updated);
  };

  // Cooking Mode Handlers
  const handleStartCookingMode = (match: RecipeMatch) => {
    setSelectedRecipeMatch(null);
    setCookingRecipeMatch(match);
  };

  const handleCookedFinished = (
    recipeId: string,
    recipeName: string,
    recipeImage: string,
    totalTime: number,
    rating: number
  ) => {
    const updated = storageService.addRecentlyCooked({
      recipeId,
      recipeName,
      recipeImage,
      totalTimeMinutes: totalTime,
      rating,
    });
    setRecentlyCooked(updated);
  };

  const handleCookAgain = (recipeId: string) => {
    const targetRecipe = RECIPES_DATABASE.find(r => r.id === recipeId);
    if (targetRecipe) {
      const match = calculateRecipeMatch(
        targetRecipe,
        userIngredientIds,
        preferences.assumePantryStaples
      );
      setCookingRecipeMatch(match);
    }
  };

  // Substitutions Helpers
  const handleOpenSubstitute = (e: React.MouseEvent, ingredientName: string) => {
    e.stopPropagation();
    setSubstitutionsInitialQuery(ingredientName);
    setIsSubstitutionsModalOpen(true);
  };

  const handleOpenSubstitutionsGuide = (ingredientName: string = '') => {
    setSubstitutionsInitialQuery(ingredientName);
    setIsSubstitutionsModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-amber-100 selection:text-amber-900 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-stone-900/95 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-stone-700 animate-fade-in backdrop-blur-md">
          <span className="text-amber-400 font-bold text-sm">✓</span>
          <span className="text-xs sm:text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Top and Mobile Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        fridgeCount={fridgeItems.length}
        favoritesCount={favoriteIds.length}
        onOpenSurpriseMe={() => setIsSurpriseMeOpen(true)}
        onOpenScanner={() => setIsScannerOpen(true)}
        onResetFridge={handleResetFridge}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <div className="space-y-6">
            <LandingHero
              onStartCooking={() => setActiveTab('ingredients')}
              onOpenSurpriseMe={() => setIsSurpriseMeOpen(true)}
              setActiveTab={setActiveTab}
              fridgeCount={fridgeItems.length}
            />

            {/* Teaser of top matching dishes directly on homepage */}
            <div className="border-t border-stone-200 bg-white py-12">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {fridgeItems.length < 5 ? (
                  <div className="bg-amber-50/70 border border-amber-200/80 rounded-3xl p-8 sm:p-10 text-center max-w-2xl mx-auto space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 text-2xl flex items-center justify-center mx-auto shadow-2xs">
                      🔒
                    </div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                      Choose at least 5 items to see dishes
                    </h3>
                    <p className="text-stone-600 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
                      You currently have <strong>{fridgeItems.length}</strong> of 5 ingredients selected{fridgeItems.length > 0 ? ` (${fridgeItems.map(i => i.name).join(', ')})` : ''}. Pick at least <strong>{5 - fridgeItems.length} more</strong> to unlock personalized recipes!
                    </p>

                    {/* Progress indicator */}
                    <div className="max-w-xs mx-auto space-y-1.5 pt-1">
                      <div className="w-full h-2.5 bg-stone-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-500 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(100, Math.round((fridgeItems.length / 5) * 100))}%` }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-stone-500">
                        {fridgeItems.length} / 5 ingredients selected
                      </span>
                    </div>

                    <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                      <button
                        onClick={() => setActiveTab('ingredients')}
                        className="px-6 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-sm shadow-md transition-all active:scale-95 cursor-pointer"
                      >
                        Add Ingredients (Need {5 - fridgeItems.length} more) →
                      </button>
                      <button
                        onClick={handleResetFridge}
                        className="px-4 py-3 rounded-xl bg-white hover:bg-stone-100 text-stone-800 font-semibold text-sm border border-stone-300 transition-colors cursor-pointer"
                      >
                        Reset Basic Staples
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-amber-700 block mb-1">
                          Ready In Your Kitchen
                        </span>
                        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                          Dishes you can prepare right now
                        </h2>
                      </div>
                      <button
                        onClick={() => setActiveTab('discover')}
                        className="text-sm font-bold text-amber-700 hover:text-amber-900 self-start sm:self-auto flex items-center gap-1.5 underline cursor-pointer"
                      >
                        <span>View all {rankedRecipes.length} recommendations →</span>
                      </button>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {rankedRecipes.slice(0, 3).map(match => (
                        <div
                          key={match.recipe.id}
                          onClick={() => setSelectedRecipeMatch(match)}
                          className="cursor-pointer"
                        >
                          <RecipeDiscoveryCardPreview
                            match={match}
                            isFavorite={favoriteIds.includes(match.recipe.id)}
                            onToggleFavorite={e => handleToggleFavorite(e, match.recipe.id)}
                          />
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'ingredients' && (
          <IngredientSelector
            fridgeItems={fridgeItems}
            onAddIngredient={handleAddIngredient}
            onRemoveIngredient={handleRemoveIngredient}
            onClearAll={handleClearAllIngredients}
            onResetStaples={handleResetFridge}
            onContinue={() => setActiveTab('discover')}
            onOpenScanner={() => setIsScannerOpen(true)}
          />
        )}

        {activeTab === 'discover' && (
          <RecipeDiscovery
            rankedRecipes={rankedRecipes}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            preferences={preferences}
            onUpdatePreferences={handleUpdatePreferences}
            onResetPreferences={handleResetPreferences}
            onResetFridge={handleResetFridge}
            sortBy={sortBy}
            setSortBy={setSortBy}
            favoriteIds={favoriteIds}
            onToggleFavorite={handleToggleFavorite}
            onSelectRecipe={match => setSelectedRecipeMatch(match)}
            onOpenSubstitute={handleOpenSubstitute}
            setActiveTab={setActiveTab}
            fridgeCount={fridgeItems.length}
            fridgeItems={fridgeItems}
            onAddIngredient={handleAddIngredient}
            onOpenScanner={() => setIsScannerOpen(true)}
          />
        )}

        {activeTab === 'favorites' && (
          <FavoritesView
            favoriteMatches={favoriteMatches}
            favoriteIds={favoriteIds}
            onToggleFavorite={handleToggleFavorite}
            onSelectRecipe={match => setSelectedRecipeMatch(match)}
            onOpenSubstitute={handleOpenSubstitute}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'history' && (
          <RecentlyCookedView
            items={recentlyCooked}
            onClearHistory={() => {
              storageService.clearRecentlyCooked();
              setRecentlyCooked([]);
            }}
            onCookAgain={handleCookAgain}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'substitutions' && (
          <div className="py-8">
            <SubstitutionsInlineView
              onSelectIngredient={ing => {
                setSubstitutionsInitialQuery(ing);
                setIsSubstitutionsModalOpen(true);
              }}
            />
          </div>
        )}
      </main>

      {/* Global Footer */}
      <Footer
        setActiveTab={setActiveTab}
        onOpenSurpriseMe={() => setIsSurpriseMeOpen(true)}
        onOpenScanner={() => setIsScannerOpen(true)}
      />

      {/* Modals */}
      <RecipeDetailModal
        match={selectedRecipeMatch}
        onClose={() => setSelectedRecipeMatch(null)}
        onStartCookingMode={handleStartCookingMode}
        isFavorite={selectedRecipeMatch ? favoriteIds.includes(selectedRecipeMatch.recipe.id) : false}
        onToggleFavorite={handleToggleFavoriteById}
        onOpenSubstitutionsGuide={handleOpenSubstitutionsGuide}
      />

      <CookingModeModal
        match={cookingRecipeMatch}
        onClose={() => setCookingRecipeMatch(null)}
        onCookedFinished={handleCookedFinished}
      />

      <SurpriseMeModal
        isOpen={isSurpriseMeOpen}
        onClose={() => setIsSurpriseMeOpen(false)}
        availableMatches={rankedRecipes}
        onSelectRecipe={match => setSelectedRecipeMatch(match)}
        onStartCooking={match => setCookingRecipeMatch(match)}
        fridgeCount={fridgeItems.length}
        onGoToIngredients={() => {
          setIsSurpriseMeOpen(false);
          setActiveTab('ingredients');
        }}
      />

      <FridgeScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onAddDetectedIngredients={handleAddDetectedIngredients}
      />

      <SubstitutionsGuideModal
        isOpen={isSubstitutionsModalOpen}
        onClose={() => setIsSubstitutionsModalOpen(false)}
        initialQuery={substitutionsInitialQuery}
      />
    </div>
  );
}

// Inline card preview component for home page teaser
function RecipeDiscoveryCardPreview({
  match,
  isFavorite,
  onToggleFavorite,
}: {
  match: RecipeMatch;
  isFavorite: boolean;
  onToggleFavorite: (e: React.MouseEvent) => void;
}) {
  return (
    <div className="bg-[#FAF8F5] rounded-3xl overflow-hidden border border-stone-200/90 shadow-2xs hover:shadow-xl transition-all duration-300 group flex flex-col justify-between">
      <div className="relative aspect-16/10 overflow-hidden bg-stone-900">
        <img
          src={match.recipe.image}
          alt={match.recipe.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={handleImageError}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute top-3 inset-x-3 flex items-center justify-between">
          <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold shadow-sm">
            {match.matchPercentage}% Match
          </span>
          <button
            onClick={onToggleFavorite}
            className="w-8 h-8 rounded-full bg-white/90 text-stone-700 hover:text-rose-500 flex items-center justify-center shadow-xs"
          >
            <span className={isFavorite ? 'text-rose-500' : ''}>♥</span>
          </button>
        </div>
        <div className="absolute bottom-3 left-3 text-white">
          <span className="text-xs uppercase tracking-wider text-amber-300 font-semibold block">
            {match.recipe.cuisine} · {match.recipe.totalTimeMinutes}m
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-serif text-lg font-bold text-stone-900 group-hover:text-amber-800 transition-colors">
          {match.recipe.name}
        </h3>
        <p className="text-xs text-stone-500 mt-1 line-clamp-2 leading-relaxed">
          {match.recipe.description}
        </p>
      </div>
    </div>
  );
}

// Inline Substitutions Explorer view for direct tab navigation
function SubstitutionsInlineView({ onSelectIngredient }: { onSelectIngredient: (name: string) => void }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="pb-6 border-b border-stone-200">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-2">
          <span>Culinary Encyclopedia</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
          Ingredient Substitutions Guide
        </h1>
        <p className="text-stone-600 text-sm sm:text-base mt-1">
          Missing an ingredient? Never panic or stop cooking. Explore science-backed culinary swaps with exact ratios.
        </p>
      </div>

      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { name: 'Heavy Cream', swap: 'Whole Milk + Melted Butter (3:1 ratio)', desc: 'Matches the 36% butterfat structure of cream for velvet pan sauces and pasta.' },
          { name: 'Parmesan Cheese', swap: 'Pecorino Romano or Nutritional Yeast', desc: 'Delivers sharp, crystallized umami crystals and salty savory depth.' },
          { name: 'Butter', swap: 'Extra Virgin Olive Oil (3/4 amount)', desc: 'Healthy monounsaturated fat that browns aromatics without burning.' },
          { name: 'Eggs (in Baking)', swap: 'Flaxseed Meal + Water or Mashed Banana', desc: 'Soluble plant fibers swell and replicate the elasticity and structure of egg whites.' },
          { name: 'Fresh Garlic', swap: 'Garlic Powder (1/4 tsp per clove) or Shallot', desc: 'Pure allium flavor that disperses evenly throughout sauces.' },
          { name: 'Soy Sauce', swap: 'Tamari or Coconut Aminos + Pinch of Salt', desc: 'Naturally gluten-free amino acids providing rich, dark savory depth.' },
        ].map((item, i) => (
          <div
            key={i}
            onClick={() => onSelectIngredient(item.name)}
            className="p-6 rounded-3xl bg-white border border-stone-200/90 shadow-2xs hover:shadow-md hover:border-amber-300 transition-all cursor-pointer space-y-3"
          >
            <span className="text-xs uppercase font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg">
              Missing: {item.name}
            </span>
            <h3 className="font-serif text-lg font-bold text-stone-900">
              {item.swap}
            </h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              {item.desc}
            </p>
            <span className="text-xs font-bold text-amber-700 inline-block pt-1">
              Read why it works →
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
