import React, { useState, useMemo } from 'react';
import {
  Search,
  Plus,
  X,
  Camera,
  Trash2,
  Sparkles,
  ArrowRight,
  Check,
  CheckCircle2,
  RotateCcw,
} from 'lucide-react';
import { CATEGORIES, COMMON_STAPLES_LIST, INGREDIENTS_DATABASE } from '../data/ingredientsData';
import { FridgeItem, IngredientCategory } from '../types';

interface IngredientSelectorProps {
  fridgeItems: FridgeItem[];
  onAddIngredient: (name: string, category?: IngredientCategory, emoji?: string) => void;
  onRemoveIngredient: (id: string) => void;
  onClearAll: () => void;
  onResetStaples?: () => void;
  onContinue: () => void;
  onOpenScanner: () => void;
}

export const IngredientSelector: React.FC<IngredientSelectorProps> = ({
  fridgeItems,
  onAddIngredient,
  onRemoveIngredient,
  onClearAll,
  onResetStaples,
  onContinue,
  onOpenScanner,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<IngredientCategory | 'all'>('all');
  const [customInput, setCustomInput] = useState('');

  // Set of current fridge item IDs and names for fast check
  const activeIds = useMemo(() => new Set(fridgeItems.map(i => i.id)), [fridgeItems]);
  const activeNames = useMemo(
    () => new Set(fridgeItems.map(i => i.name.toLowerCase().trim())),
    [fridgeItems]
  );

  // Filtered ingredients from database based on category and search query
  const filteredIngredients = useMemo(() => {
    return INGREDIENTS_DATABASE.filter(item => {
      // Category check
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Search query check
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesAlias = item.aliases.some(a => a.toLowerCase().includes(q));
        return matchesName || matchesAlias;
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  // Handle custom ingredient submission
  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = customInput.trim();
    if (!trimmed) return;
    onAddIngredient(trimmed, 'other', '✨');
    setCustomInput('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header & Photo Scanner Trigger */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-stone-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/70 text-amber-900 text-xs font-semibold mb-2">
            <span>Kitchen Inventory</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
            What's in your fridge today?
          </h1>
          <p className="text-stone-600 text-sm sm:text-base mt-1">
            Tap items you currently have or search anything in your kitchen.
          </p>
        </div>

        {/* Fridge Photo Banner Trigger */}
        <button
          onClick={onOpenScanner}
          className="flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
        >
          <Camera className="w-5 h-5 animate-pulse" />
          <div className="text-left">
            <span className="block text-xs font-normal opacity-90">Have a messy fridge?</span>
            <span className="block text-sm font-bold">Scan with Photo 📷</span>
          </div>
        </button>
      </div>

      {/* Selected Ingredients Visual Tray / Counter Bar */}
      <div className="mt-8 bg-white rounded-3xl p-5 sm:p-7 border border-[#E8DFD5] shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <span className={`w-3 h-3 rounded-full ${fridgeItems.length >= 5 ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
              <h2 className="text-base sm:text-lg font-bold text-stone-900">
                {fridgeItems.length === 0 ? (
                  <span className="text-stone-500 font-normal">No ingredients selected yet</span>
                ) : (
                  <span>
                    <strong className={fridgeItems.length >= 5 ? 'text-emerald-700' : 'text-amber-700'}>
                      {fridgeItems.length}
                    </strong>{' '}
                    {fridgeItems.length === 1 ? 'ingredient' : 'ingredients'} selected
                  </span>
                )}
              </h2>
            </div>
            {fridgeItems.length < 5 ? (
              <p className="text-xs text-amber-800 font-medium">
                Choose at least <strong>5 items</strong> to see dishes (need <strong>{5 - fridgeItems.length} more</strong>)
              </p>
            ) : (
              <p className="text-xs text-emerald-700 font-semibold">
                ✓ 5+ items selected — Recipes unlocked!
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 sm:gap-3 flex-wrap sm:flex-nowrap">
            {onResetStaples && (
              <button
                onClick={onResetStaples}
                className="flex items-center gap-1.5 text-xs font-medium text-stone-600 hover:text-amber-800 px-3 py-1.5 rounded-lg hover:bg-amber-50 border border-stone-200 transition-colors cursor-pointer"
                title="Reset fridge to recommended everyday staples"
              >
                <RotateCcw className="w-3.5 h-3.5 text-amber-600" />
                <span>Reset staples</span>
              </button>
            )}

            {fridgeItems.length > 0 && (
              <button
                onClick={onClearAll}
                className="flex items-center gap-1.5 text-xs font-medium text-stone-500 hover:text-rose-600 px-3 py-1.5 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                title="Remove all selected items"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear all</span>
              </button>
            )}

            <button
              onClick={onContinue}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-xs cursor-pointer ${
                fridgeItems.length >= 5
                  ? 'bg-stone-900 hover:bg-stone-800 text-white shadow-md active:scale-95'
                  : 'bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300'
              }`}
            >
              <span>
                {fridgeItems.length >= 5
                  ? 'Continue to Recipes'
                  : `See Dishes (Need ${5 - fridgeItems.length} more)`}
              </span>
              <ArrowRight className="w-4 h-4 text-amber-500" />
            </button>
          </div>
        </div>

        {/* Progress bar toward 5 items */}
        {fridgeItems.length < 5 && (
          <div className="pt-3 pb-1">
            <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden border border-stone-200/60">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, Math.round((fridgeItems.length / 5) * 100))}%` }}
              />
            </div>
          </div>
        )}

        {/* Active Ingredient Chips */}
        {fridgeItems.length === 0 ? (
          <div className="py-8 text-center text-stone-500">
            <p className="text-sm">Tap any ingredient below or search to stock your digital fridge.</p>
          </div>
        ) : (
          <div className="pt-4 flex flex-wrap gap-2 sm:gap-2.5 max-h-48 overflow-y-auto pr-1">
            {fridgeItems.map(item => (
              <div
                key={item.id}
                className="inline-flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-full bg-amber-50/80 border border-amber-200/80 text-stone-800 text-xs sm:text-sm font-medium shadow-2xs hover:border-amber-300 transition-all group"
              >
                <span>{item.emoji}</span>
                <span>{item.name}</span>
                <button
                  onClick={() => onRemoveIngredient(item.id)}
                  className="w-4 h-4 rounded-full bg-amber-200/60 hover:bg-rose-500 hover:text-white flex items-center justify-center text-amber-800 transition-colors ml-0.5"
                  title={`Remove ${item.name}`}
                >
                  <X className="w-2.5 h-2.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Add Common Staples */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
            Quick Add Everyday Staples
          </span>
          <span className="text-xs text-stone-400">1-click toggle</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {COMMON_STAPLES_LIST.map(name => {
            const isSelected = activeNames.has(name.toLowerCase());
            return (
              <button
                key={name}
                onClick={() => {
                  if (isSelected) {
                    const match = fridgeItems.find(i => i.name.toLowerCase() === name.toLowerCase());
                    if (match) onRemoveIngredient(match.id);
                  } else {
                    onAddIngredient(name);
                  }
                }}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-amber-600 text-white shadow-xs font-semibold'
                    : 'bg-white hover:bg-stone-50 text-stone-700 border border-stone-200 shadow-2xs hover:border-amber-300'
                }`}
              >
                {isSelected ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3 text-stone-400" />}
                <span>{name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Search & Custom Item Row */}
      <div className="mt-8 grid md:grid-cols-12 gap-4">
        {/* Instant Search Box */}
        <div className="md:col-span-8 relative">
          <Search className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search ingredients (e.g., parmesan, heavy cream, chicken, spinach)..."
            className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-white border border-stone-300 text-stone-900 placeholder:text-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 shadow-2xs transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Custom Item Adder */}
        <form onSubmit={handleAddCustom} className="md:col-span-4 flex gap-2">
          <input
            type="text"
            value={customInput}
            onChange={e => setCustomInput(e.target.value)}
            placeholder="Add custom item..."
            className="w-full px-4 py-3.5 rounded-2xl bg-white border border-stone-300 text-stone-900 placeholder:text-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 shadow-2xs"
          />
          <button
            type="submit"
            disabled={!customInput.trim()}
            className="px-4 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 disabled:bg-stone-200 text-white font-semibold text-sm transition-colors shrink-0 flex items-center justify-center"
            title="Add custom ingredient"
          >
            <Plus className="w-5 h-5" />
          </button>
        </form>
      </div>

      {/* Category Filter Tabs */}
      <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold shrink-0 transition-all ${
            selectedCategory === 'all'
              ? 'bg-stone-900 text-white shadow-xs'
              : 'bg-white hover:bg-stone-50 text-stone-600 border border-stone-200'
          }`}
        >
          All Items ({INGREDIENTS_DATABASE.length})
        </button>

        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium shrink-0 transition-all ${
              selectedCategory === cat.id
                ? 'bg-amber-600 text-white shadow-xs font-semibold'
                : 'bg-white hover:bg-stone-50 text-stone-700 border border-stone-200'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Ingredients Grid */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {filteredIngredients.map(item => {
          const isSelected = activeIds.has(item.id) || activeNames.has(item.name.toLowerCase());
          return (
            <button
              key={item.id}
              onClick={() => {
                if (isSelected) {
                  onRemoveIngredient(item.id);
                } else {
                  onAddIngredient(item.name, item.category, item.emoji);
                }
              }}
              className={`p-3.5 rounded-2xl border text-left transition-all flex items-center gap-3 relative group ${
                isSelected
                  ? 'bg-amber-50 border-amber-400 shadow-2xs'
                  : 'bg-white hover:bg-[#FDFBF7] border-stone-200 shadow-2xs hover:border-amber-200 hover:-translate-y-0.5'
              }`}
            >
              <span className="text-2xl shrink-0 group-hover:scale-110 transition-transform">
                {item.emoji}
              </span>
              <div className="overflow-hidden">
                <span className="text-xs sm:text-sm font-bold text-stone-800 block truncate">
                  {item.name}
                </span>
                <span className="text-[10px] text-stone-400 capitalize block truncate">
                  {item.category}
                </span>
              </div>

              {isSelected && (
                <div className="absolute top-2 right-2 text-amber-600">
                  <CheckCircle2 className="w-4 h-4 fill-amber-500 text-white" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Empty Search Fallback */}
      {filteredIngredients.length === 0 && (
        <div className="py-12 text-center bg-white rounded-3xl border border-stone-200 p-8 mt-6">
          <Sparkles className="w-8 h-8 text-amber-500 mx-auto mb-3" />
          <h3 className="font-serif text-lg font-bold text-stone-900">
            No matching standard ingredients for "{searchQuery}"
          </h3>
          <p className="text-stone-500 text-sm mt-1 max-w-md mx-auto">
            You can still add "{searchQuery}" as a custom ingredient to your fridge right now!
          </p>
          <button
            onClick={() => {
              onAddIngredient(searchQuery, 'other', '✨');
              setSearchQuery('');
            }}
            className="mt-4 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-sm inline-flex items-center gap-2 shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add "{searchQuery}" anyway</span>
          </button>
        </div>
      )}

      {/* Bottom Sticky Floating Continue Bar */}
      <div className="sticky bottom-4 z-30 mt-10">
        <div className="max-w-xl mx-auto bg-stone-900/95 backdrop-blur-md rounded-2xl p-4 text-white shadow-xl flex items-center justify-between gap-4 border border-stone-700">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              {fridgeItems.length}
            </div>
            <div>
              <p className="text-xs font-semibold text-stone-200">
                {fridgeItems.length} {fridgeItems.length === 1 ? 'item' : 'items'} in your fridge
              </p>
              <p className="text-[11px] text-stone-400">Ready to discover dishes</p>
            </div>
          </div>

          <button
            onClick={onContinue}
            disabled={fridgeItems.length === 0}
            className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:bg-stone-800 disabled:text-stone-500 text-stone-950 font-bold text-sm flex items-center gap-2 transition-all active:scale-95 shadow-xs"
          >
            <span>Show Dishes</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
