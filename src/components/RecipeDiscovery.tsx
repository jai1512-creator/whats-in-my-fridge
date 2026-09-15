import React, { useState } from 'react';
import {
  Search,
  SlidersHorizontal,
  Sparkles,
  ArrowUpDown,
  PlusCircle,
  RotateCcw,
  BookOpen,
  X,
  RefreshCw,
  CheckCircle2,
  ArrowRight,
  Lock,
} from 'lucide-react';
import { RecipeCard } from './RecipeCard';
import { PreferencesFilter } from './PreferencesFilter';
import { ActiveTab, FridgeItem, IngredientCategory, RecipeMatch, UserPreferences } from '../types';

const QUICK_UNLOCK_STAPLES = [
  { name: 'Potatoes', category: 'vegetables' as const, emoji: '🥔' },
  { name: 'Onions', category: 'vegetables' as const, emoji: '🧅' },
  { name: 'Tomatoes', category: 'vegetables' as const, emoji: '🍅' },
  { name: 'Garlic', category: 'vegetables' as const, emoji: '🧄' },
  { name: 'Green Chilies', category: 'vegetables' as const, emoji: '🌶️' },
  { name: 'Butter', category: 'dairy' as const, emoji: '🧈' },
  { name: 'Paneer', category: 'dairy' as const, emoji: '🧀' },
  { name: 'Cheddar Cheese', category: 'dairy' as const, emoji: '🧀' },
  { name: 'Eggs', category: 'eggs' as const, emoji: '🥚' },
  { name: 'Rice', category: 'grains' as const, emoji: '🍚' },
  { name: 'Pasta', category: 'grains' as const, emoji: '🍝' },
];

interface RecipeDiscoveryProps {
  rankedRecipes: RecipeMatch[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  preferences: UserPreferences;
  onUpdatePreferences: (updated: Partial<UserPreferences>) => void;
  onResetPreferences: () => void;
  onResetFridge: () => void;
  sortBy: 'best-match' | 'quickest' | 'fewest-missing';
  setSortBy: (sort: 'best-match' | 'quickest' | 'fewest-missing') => void;
  favoriteIds: string[];
  onToggleFavorite: (e: React.MouseEvent, recipeId: string) => void;
  onSelectRecipe: (match: RecipeMatch) => void;
  onOpenSubstitute: (e: React.MouseEvent, ingredientName: string) => void;
  setActiveTab: (tab: ActiveTab) => void;
  fridgeCount: number;
  fridgeItems?: FridgeItem[];
  onAddIngredient?: (name: string, category?: IngredientCategory, emoji?: string) => void;
  onOpenScanner?: () => void;
}

export const RecipeDiscovery: React.FC<RecipeDiscoveryProps> = ({
  rankedRecipes,
  searchQuery,
  setSearchQuery,
  preferences,
  onUpdatePreferences,
  onResetPreferences,
  onResetFridge,
  sortBy,
  setSortBy,
  favoriteIds,
  onToggleFavorite,
  onSelectRecipe,
  onOpenSubstitute,
  setActiveTab,
  fridgeCount,
  fridgeItems = [],
  onAddIngredient,
  onOpenScanner,
}) => {
  const [showPreferencesPanel, setShowPreferencesPanel] = useState(false);
  const [viewFilter, setViewFilter] = useState<'all' | '100' | 'near' | 'other'>('all');

  // If user has chosen fewer than 5 items, show the unlock guidance screen instead of dishes
  if (fridgeCount < 5) {
    const itemsNeeded = 5 - fridgeCount;
    const progressPercent = Math.min(100, Math.round((fridgeCount / 5) * 100));

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 animate-fadeIn">
        {/* Banner card */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200 shadow-sm text-center space-y-6">
          <div className="w-16 h-16 rounded-3xl bg-amber-100 text-amber-700 text-3xl flex items-center justify-center mx-auto shadow-2xs">
            <Lock className="w-8 h-8 text-amber-600" />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
              <span>Choose At Least 5 Items</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
              Choose at least 5 ingredients to see dishes
            </h1>
            <p className="text-stone-600 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
              To give you authentic, delicious recipe recommendations you can actually cook, please pick at least <strong>5 ingredients</strong> from your kitchen.
            </p>
          </div>

          {/* Progress Tracker Card */}
          <div className="max-w-md mx-auto bg-stone-50 border border-stone-200/80 rounded-2xl p-5 space-y-3.5">
            <div className="flex items-center justify-between text-xs sm:text-sm font-bold">
              <span className="text-stone-700">Inventory Progress</span>
              <span className="text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-200">
                {fridgeCount} of 5 chosen ({itemsNeeded} more needed)
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-3 bg-stone-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* 5 Slots representation */}
            <div className="grid grid-cols-5 gap-2 pt-1">
              {[0, 1, 2, 3, 4].map(idx => {
                const item = fridgeItems[idx];
                const isFilled = idx < fridgeCount && item;
                return (
                  <div
                    key={idx}
                    className={`h-16 rounded-xl border flex flex-col items-center justify-center text-center p-1 transition-all ${
                      isFilled
                        ? 'bg-amber-50 border-amber-300 text-stone-800 shadow-2xs'
                        : 'border-dashed border-stone-300 bg-white/70 text-stone-400'
                    }`}
                  >
                    {isFilled ? (
                      <>
                        <span className="text-xl leading-none">{item.emoji}</span>
                        <span className="text-[10px] font-semibold truncate w-full mt-1">
                          {item.name}
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="text-xs font-bold text-stone-300">#{idx + 1}</span>
                        <span className="text-[9px] text-stone-400">Empty</span>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 1-Click Quick Add Suggestions */}
          {onAddIngredient && (
            <div className="pt-2 text-left max-w-xl mx-auto space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Quick Add Everyday Staples (1-Tap):
                </span>
                <span className="text-xs text-stone-400">Tap to reach 5</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {QUICK_UNLOCK_STAPLES.filter(s => !fridgeItems.some(fi => fi.name.toLowerCase() === s.name.toLowerCase())).map(staple => (
                  <button
                    key={staple.name}
                    onClick={() => onAddIngredient(staple.name, staple.category, staple.emoji)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-amber-50 border border-stone-200 hover:border-amber-300 text-stone-800 text-xs sm:text-sm font-medium shadow-2xs hover:shadow-xs transition-all active:scale-95 cursor-pointer"
                  >
                    <span>{staple.emoji}</span>
                    <span>{staple.name}</span>
                    <span className="text-amber-600 font-bold ml-0.5">+</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Action CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => setActiveTab('ingredients')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Go to Fridge Inventory (Search 86+ items)</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>

            {onOpenScanner && (
              <button
                onClick={onOpenScanner}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>📷 Scan Fridge Photo</span>
              </button>
            )}

            <button
              onClick={onResetFridge}
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-sm transition-colors cursor-pointer"
            >
              Reset Basic Staples
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Match breakdown counts
  const perfectMatches = rankedRecipes.filter(r => r.matchPercentage === 100);
  const nearMatches = rankedRecipes.filter(r => r.matchPercentage >= 75 && r.matchPercentage < 100);
  const otherMatches = rankedRecipes.filter(r => r.matchPercentage < 75);

  // Active filters detection
  const activeFilterList: { label: string; key: keyof UserPreferences; resetVal: unknown }[] = [];
  if (preferences.cuisine && preferences.cuisine !== 'all') {
    activeFilterList.push({ label: `Cuisine: ${preferences.cuisine.toUpperCase()}`, key: 'cuisine', resetVal: 'all' });
  }
  if (preferences.dietary !== 'all') {
    activeFilterList.push({ label: `Diet: ${preferences.dietary}`, key: 'dietary', resetVal: 'all' });
  }
  if (preferences.cookingTime !== 'all') {
    activeFilterList.push({ label: `Time: ${preferences.cookingTime.replace('under-', '<')}m`, key: 'cookingTime', resetVal: 'all' });
  }
  if (preferences.difficulty !== 'all') {
    activeFilterList.push({ label: `Skill: ${preferences.difficulty}`, key: 'difficulty', resetVal: 'all' });
  }
  if (preferences.mealType !== 'all') {
    activeFilterList.push({ label: `Meal: ${preferences.mealType}`, key: 'mealType', resetVal: 'all' });
  }
  if (preferences.spiceLevel !== 'all') {
    activeFilterList.push({ label: `Spice: ${preferences.spiceLevel}`, key: 'spiceLevel', resetVal: 'all' });
  }

  // Filter recipes according to view filter tab
  const displayedRecipes = (() => {
    if (viewFilter === '100') return perfectMatches;
    if (viewFilter === 'near') return nearMatches;
    if (viewFilter === 'other') return otherMatches;
    return rankedRecipes; // 'all'
  })();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Discovery Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 text-emerald-900 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Recipe Discovery Engine</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900">
            Here's what you can make.
          </h1>
          <p className="text-stone-600 text-sm sm:text-base mt-1.5">
            Ranked by what's already waiting in your fridge. Tap any dish for the step-by-step recipe.
          </p>
        </div>

        {/* Quick summary stats & Reset Button */}
        <div className="flex flex-wrap items-center gap-2.5 text-xs sm:text-sm font-semibold">
          <button
            onClick={() => setViewFilter('100')}
            className={`px-3.5 py-2 rounded-xl border transition-all flex items-center gap-1.5 cursor-pointer ${
              viewFilter === '100'
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                : 'bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span><strong>{perfectMatches.length}</strong> Ready to Cook (100%)</span>
          </button>

          <button
            onClick={() => setViewFilter('near')}
            className={`px-3.5 py-2 rounded-xl border transition-all cursor-pointer ${
              viewFilter === 'near'
                ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                : 'bg-amber-50 border-amber-200 text-amber-800 hover:bg-amber-100'
            }`}
          >
            <strong>{nearMatches.length}</strong> Need 1 Item
          </button>

          {/* Quick Reset Fridge & Filters Button */}
          <button
            onClick={() => {
              onResetFridge();
              setViewFilter('all');
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold transition-all border border-amber-300 shadow-2xs active:scale-95 cursor-pointer"
            title="Reset fridge to default ingredients and clear filters"
          >
            <RefreshCw className="w-3.5 h-3.5 text-amber-700" />
            <span>Reset Fridge</span>
          </button>
        </div>
      </div>

      {/* Diet Quick Filter Tabs (Vegetarian vs Non-Vegetarian) */}
      <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-xs font-bold uppercase tracking-wider text-stone-500 mr-1 shrink-0">
          Diet:
        </span>
        {[
          { id: 'all', label: 'All Dishes', emoji: '🍽️', activeClass: 'bg-stone-900 text-white shadow-xs' },
          { id: 'vegetarian', label: 'Pure Vegetarian (No Eggs)', emoji: '🟢', activeClass: 'bg-emerald-600 text-white shadow-xs' },
          { id: 'non-vegetarian', label: 'Non-Vegetarian (Eggs & Meat)', emoji: '🍗', activeClass: 'bg-rose-600 text-white shadow-xs' },
          { id: 'vegan', label: 'Vegan', emoji: '🌱', activeClass: 'bg-teal-600 text-white shadow-xs' },
        ].map(d => {
          const isActive = (preferences.dietary || 'all') === d.id;
          return (
            <button
              key={d.id}
              onClick={() => onUpdatePreferences({ dietary: d.id as any })}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
                isActive
                  ? `${d.activeClass} font-bold ring-2 ring-stone-900/10`
                  : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200 shadow-2xs'
              }`}
            >
              <span>{d.emoji}</span>
              <span>{d.label}</span>
            </button>
          );
        })}
      </div>

      {/* Cuisine Quick Filter Tabs */}
      <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-xs font-bold uppercase tracking-wider text-stone-500 mr-1 shrink-0">
          Cuisine:
        </span>
        {[
          { id: 'all', label: 'All Cuisines', emoji: '🌍' },
          { id: 'indian', label: 'Indian', emoji: '🇮🇳' },
          { id: 'italian', label: 'Italian', emoji: '🇮🇹' },
          { id: 'american', label: 'American', emoji: '🇺🇸' },
          { id: 'asian', label: 'Asian', emoji: '🥢' },
          { id: 'mexican', label: 'Mexican', emoji: '🇲🇽' },
        ].map(c => {
          const isActive = (preferences.cuisine || 'all') === c.id;
          return (
            <button
              key={c.id}
              onClick={() => onUpdatePreferences({ cuisine: c.id as any })}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
                isActive
                  ? 'bg-amber-600 text-white shadow-xs font-bold'
                  : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200 shadow-2xs'
              }`}
            >
              <span>{c.emoji}</span>
              <span>{c.label}</span>
            </button>
          );
        })}
      </div>

      {/* Search, Filter Toggle, and Sort Bar */}
      <div className="mt-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search dishes by name, cuisine, or ingredient..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-stone-300 text-stone-900 text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 shadow-2xs"
          />
        </div>

        {/* Controls: Filter Button & Sort Dropdown */}
        <div className="flex items-center gap-2.5">
          {/* Preferences Filter Toggle Button */}
          <button
            onClick={() => setShowPreferencesPanel(!showPreferencesPanel)}
            className={`flex items-center gap-2 px-4 py-3 rounded-2xl border text-sm font-semibold transition-all relative ${
              showPreferencesPanel || activeFilterList.length > 0
                ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                : 'bg-white hover:bg-stone-50 text-stone-700 border-stone-300 shadow-2xs'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Preferences</span>
            {activeFilterList.length > 0 && (
              <span className="w-5 h-5 rounded-full bg-white text-amber-700 text-xs font-bold flex items-center justify-center">
                {activeFilterList.length}
              </span>
            )}
          </button>

          {/* Sort Selector */}
          <div className="relative flex items-center bg-white border border-stone-300 rounded-2xl px-3 py-1.5 shadow-2xs">
            <ArrowUpDown className="w-4 h-4 text-stone-400 mr-2 shrink-0" />
            <select
              value={sortBy}
              onChange={e =>
                setSortBy(e.target.value as 'best-match' | 'quickest' | 'fewest-missing')
              }
              className="bg-transparent text-xs sm:text-sm font-semibold text-stone-700 focus:outline-none pr-3 py-1.5 cursor-pointer"
            >
              <option value="best-match">Best Match First</option>
              <option value="quickest">Quickest Cook Time</option>
              <option value="fewest-missing">Fewest Missing Items</option>
            </select>
          </div>
        </div>
      </div>

      {/* Active Filters Pill Bar (Always visible when a filter is applied!) */}
      {activeFilterList.length > 0 && (
        <div className="mt-4 p-3.5 bg-amber-50/90 border border-amber-200/80 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs animate-fadeIn">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-bold text-amber-950">Active Filters:</span>
            {activeFilterList.map(item => (
              <span
                key={item.label}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-amber-300 text-stone-800 font-semibold shadow-2xs"
              >
                <span>{item.label}</span>
                <button
                  onClick={() => onUpdatePreferences({ [item.key]: item.resetVal })}
                  className="w-3.5 h-3.5 rounded-full hover:bg-stone-200 flex items-center justify-center text-stone-500 hover:text-stone-900"
                  title={`Clear ${item.label}`}
                >
                  <X className="w-2.5 h-2.5" />
                </button>
              </span>
            ))}
          </div>

          <button
            onClick={onResetPreferences}
            className="text-xs font-bold text-amber-800 hover:text-amber-950 underline hover:no-underline transition-colors"
          >
            Clear all filters (show all recipes)
          </button>
        </div>
      )}

      {/* View Filter Tabs: All, 100% Ready, Need 1 Item, Need 2+ */}
      <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => setViewFilter('all')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 ${
            viewFilter === 'all'
              ? 'bg-stone-900 text-white shadow-xs'
              : 'bg-white hover:bg-stone-50 text-stone-700 border border-stone-200 shadow-2xs'
          }`}
        >
          All Recommendations ({rankedRecipes.length})
        </button>

        <button
          onClick={() => setViewFilter('100')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 ${
            viewFilter === '100'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-white hover:bg-stone-50 text-emerald-800 border border-emerald-200 shadow-2xs'
          }`}
        >
          <span>100% Ready</span>
          <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${viewFilter === '100' ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800'}`}>
            {perfectMatches.length}
          </span>
        </button>

        <button
          onClick={() => setViewFilter('near')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 ${
            viewFilter === 'near'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'bg-white hover:bg-stone-50 text-amber-800 border border-amber-200 shadow-2xs'
          }`}
        >
          <span>Need 1 Item</span>
          <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${viewFilter === 'near' ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-800'}`}>
            {nearMatches.length}
          </span>
        </button>

        <button
          onClick={() => setViewFilter('other')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 ${
            viewFilter === 'other'
              ? 'bg-stone-700 text-white shadow-xs'
              : 'bg-white hover:bg-stone-50 text-stone-600 border border-stone-200 shadow-2xs'
          }`}
        >
          <span>Need 2+ Items</span>
          <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${viewFilter === 'other' ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-700'}`}>
            {otherMatches.length}
          </span>
        </button>
      </div>

      {/* Expandable Preferences Panel */}
      {showPreferencesPanel && (
        <div className="mt-6 animate-fadeIn">
          <PreferencesFilter
            preferences={preferences}
            onUpdatePreferences={onUpdatePreferences}
            onResetPreferences={onResetPreferences}
          />
        </div>
      )}

      {/* Empty State: No Ingredients in Fridge */}
      {fridgeCount === 0 ? (
        <div className="mt-12 bg-white rounded-3xl p-10 sm:p-14 text-center border border-stone-200 shadow-sm max-w-2xl mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-700 text-3xl flex items-center justify-center mx-auto mb-2">
            🧊
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
            Your fridge is looking a little mysterious.
          </h2>
          <p className="text-stone-600 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
            Add a few ingredients and we’ll find something delicious to cook right now.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => setActiveTab('ingredients')}
              className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-md transition-all active:scale-95"
            >
              Add Ingredients →
            </button>
            <button
              onClick={onResetFridge}
              className="px-5 py-3.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-sm transition-colors"
            >
              Load Common Pantry Staples
            </button>
          </div>
        </div>
      ) : displayedRecipes.length === 0 ? (
        /* Empty State: No Recipes Match the Current Filter/Tab */
        <div className="mt-12 bg-white rounded-3xl p-10 sm:p-14 text-center border border-stone-200 shadow-sm max-w-2xl mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-orange-100 text-orange-700 text-3xl flex items-center justify-center mx-auto mb-2">
            🍽️
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
            No dishes found for this filter tab.
          </h2>
          <p className="text-stone-600 text-sm max-w-md mx-auto leading-relaxed">
            {viewFilter === '100'
              ? 'None of your recipes are 100% matched right now. Switch to "All Recommendations" or "Need 1 Item" to discover dishes you can cook with simple substitutions!'
              : 'Try clearing your active filters or expanding your ingredient list to unlock dishes.'}
          </p>

          <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setViewFilter('all')}
              className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs sm:text-sm transition-colors"
            >
              Show All Recommendations ({rankedRecipes.length})
            </button>
            <button
              onClick={onResetPreferences}
              className="px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs transition-colors"
            >
              Reset Preference Filters
            </button>
          </div>
        </div>
      ) : (
        /* Unified Responsive Recipe Grid */
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Showing {displayedRecipes.length} {displayedRecipes.length === 1 ? 'dish' : 'dishes'}
              {viewFilter === '100' && ' (100% Ready to Cook)'}
              {viewFilter === 'near' && ' (Only 1 Missing Item)'}
              {viewFilter === 'all' && ' (Sorted by Best Match)'}
            </span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedRecipes.map(match => (
              <RecipeCard
                key={match.recipe.id}
                match={match}
                isFavorite={favoriteIds.includes(match.recipe.id)}
                onToggleFavorite={onToggleFavorite}
                onSelectRecipe={onSelectRecipe}
                onOpenSubstitute={onOpenSubstitute}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
