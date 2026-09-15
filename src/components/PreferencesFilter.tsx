import React from 'react';
import { RotateCcw, Sparkles } from 'lucide-react';
import {
  CuisineFilter,
  DietaryFilter,
  DifficultyFilter,
  MealFilter,
  SpiceFilter,
  TimeFilter,
  UserPreferences,
} from '../types';

interface PreferencesFilterProps {
  preferences: UserPreferences;
  onUpdatePreferences: (updated: Partial<UserPreferences>) => void;
  onResetPreferences: () => void;
}

export const PreferencesFilter: React.FC<PreferencesFilterProps> = ({
  preferences,
  onUpdatePreferences,
  onResetPreferences,
}) => {
  const cuisineOptions: { id: CuisineFilter; label: string; icon: string }[] = [
    { id: 'all', label: 'All Cuisines', icon: '🌍' },
    { id: 'indian', label: 'Indian', icon: '🇮🇳' },
    { id: 'italian', label: 'Italian', icon: '🇮🇹' },
    { id: 'american', label: 'American', icon: '🇺🇸' },
    { id: 'asian', label: 'Asian', icon: '🥢' },
    { id: 'mexican', label: 'Mexican', icon: '🇲🇽' },
  ];

  const dietaryOptions: { id: DietaryFilter; label: string; icon: string }[] = [
    { id: 'all', label: 'All Dishes', icon: '🍽️' },
    { id: 'vegetarian', label: 'Pure Veg (No Eggs)', icon: '🟢' },
    { id: 'non-vegetarian', label: 'Non-Veg (Eggs & Meat)', icon: '🍗' },
    { id: 'vegan', label: 'Vegan', icon: '🌱' },
    { id: 'egg-free', label: 'Egg-Free', icon: '🚫🥚' },
    { id: 'dairy-free', label: 'Dairy-Free', icon: '🚫🥛' },
  ];

  const timeOptions: { id: TimeFilter; label: string; icon: string }[] = [
    { id: 'all', label: 'Any Time', icon: '⏳' },
    { id: 'under-15', label: '< 15 mins', icon: '⚡' },
    { id: 'under-30', label: '< 30 mins', icon: '⏱️' },
    { id: 'under-60', label: '< 60 mins', icon: '🍲' },
  ];

  const difficultyOptions: { id: DifficultyFilter; label: string; icon: string }[] = [
    { id: 'all', label: 'Any Skill', icon: '🧑‍🍳' },
    { id: 'easy', label: 'Easy', icon: '🟢' },
    { id: 'medium', label: 'Medium', icon: '🟡' },
    { id: 'advanced', label: 'Advanced', icon: '🔴' },
  ];

  const mealOptions: { id: MealFilter; label: string; icon: string }[] = [
    { id: 'all', label: 'Any Meal', icon: '✨' },
    { id: 'breakfast', label: 'Breakfast', icon: '🥞' },
    { id: 'lunch', label: 'Lunch', icon: '🥪' },
    { id: 'dinner', label: 'Dinner', icon: '🍝' },
    { id: 'snack', label: 'Snack', icon: '🥨' },
    { id: 'dessert', label: 'Dessert', icon: '🍰' },
  ];

  const spiceOptions: { id: SpiceFilter; label: string; icon: string }[] = [
    { id: 'all', label: 'Any Heat', icon: '🌈' },
    { id: 'mild', label: 'Mild', icon: '🌿' },
    { id: 'medium', label: 'Medium', icon: '🌶️' },
    { id: 'spicy', label: 'Spicy 🔥', icon: '🌶️🌶️' },
  ];

  const isCustomized =
    preferences.cuisine !== 'all' ||
    preferences.dietary !== 'all' ||
    preferences.cookingTime !== 'all' ||
    preferences.difficulty !== 'all' ||
    preferences.mealType !== 'all' ||
    preferences.spiceLevel !== 'all' ||
    !preferences.assumePantryStaples;

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-7 border border-[#E8DFD5] shadow-xs space-y-6">
      {/* Title & Reset Row */}
      <div className="flex items-center justify-between pb-4 border-b border-stone-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold text-stone-900 leading-tight">
              Cooking Preferences & Diet
            </h3>
            <p className="text-xs text-stone-500">Fine-tune results to your kitchen & taste</p>
          </div>
        </div>

        {isCustomized && (
          <button
            onClick={onResetPreferences}
            className="flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-amber-800 bg-stone-100 hover:bg-stone-200/80 px-3 py-1.5 rounded-lg transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset filters</span>
          </button>
        )}
      </div>

      {/* 1. Cuisine Section */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-2.5">
          Cuisine / Region
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
          {cuisineOptions.map(opt => (
            <button
              key={opt.id}
              onClick={() => onUpdatePreferences({ cuisine: opt.id })}
              className={`p-2.5 rounded-xl border text-left text-xs font-semibold flex items-center gap-2 transition-all ${
                preferences.cuisine === opt.id
                  ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                  : 'bg-stone-50/70 hover:bg-white text-stone-700 border-stone-200'
              }`}
            >
              <span>{opt.icon}</span>
              <span className="truncate">{opt.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Dietary Section */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-2.5">
          Dietary Restrictions
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {dietaryOptions.map(opt => (
            <button
              key={opt.id}
              onClick={() => onUpdatePreferences({ dietary: opt.id })}
              className={`p-2.5 rounded-xl border text-left text-xs font-semibold flex items-center gap-2 transition-all ${
                preferences.dietary === opt.id
                  ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                  : 'bg-stone-50/70 hover:bg-white text-stone-700 border-stone-200'
              }`}
            >
              <span>{opt.icon}</span>
              <span className="truncate">{opt.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Cooking Time Section */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-2.5">
          Cooking Time
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {timeOptions.map(opt => (
            <button
              key={opt.id}
              onClick={() => onUpdatePreferences({ cookingTime: opt.id })}
              className={`p-2.5 rounded-xl border text-left text-xs font-semibold flex items-center gap-2 transition-all ${
                preferences.cookingTime === opt.id
                  ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                  : 'bg-stone-50/70 hover:bg-white text-stone-700 border-stone-200'
              }`}
            >
              <span>{opt.icon}</span>
              <span className="truncate">{opt.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. Meal Type */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-2.5">
          Meal Type
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {mealOptions.map(opt => (
            <button
              key={opt.id}
              onClick={() => onUpdatePreferences({ mealType: opt.id })}
              className={`p-2.5 rounded-xl border text-left text-xs font-semibold flex items-center gap-2 transition-all ${
                preferences.mealType === opt.id
                  ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                  : 'bg-stone-50/70 hover:bg-white text-stone-700 border-stone-200'
              }`}
            >
              <span>{opt.icon}</span>
              <span className="truncate">{opt.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 4. Two Column Row: Difficulty & Spice Level */}
      <div className="grid md:grid-cols-2 gap-6 pt-2 border-t border-stone-100">
        {/* Difficulty */}
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-2">
            Skill / Difficulty
          </span>
          <div className="grid grid-cols-2 gap-2">
            {difficultyOptions.map(opt => (
              <button
                key={opt.id}
                onClick={() => onUpdatePreferences({ difficulty: opt.id })}
                className={`p-2 rounded-xl border text-left text-xs font-semibold flex items-center gap-2 transition-all ${
                  preferences.difficulty === opt.id
                    ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                    : 'bg-stone-50/70 hover:bg-white text-stone-700 border-stone-200'
                }`}
              >
                <span>{opt.icon}</span>
                <span>{opt.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Spice Level */}
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-2">
            Spice Level
          </span>
          <div className="grid grid-cols-2 gap-2">
            {spiceOptions.map(opt => (
              <button
                key={opt.id}
                onClick={() => onUpdatePreferences({ spiceLevel: opt.id })}
                className={`p-2 rounded-xl border text-left text-xs font-semibold flex items-center gap-2 transition-all ${
                  preferences.spiceLevel === opt.id
                    ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                    : 'bg-stone-50/70 hover:bg-white text-stone-700 border-stone-200'
                }`}
              >
                <span>{opt.icon}</span>
                <span>{opt.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 5. Pantry Staples Toggle Switch */}
      <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/70 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs sm:text-sm font-bold text-amber-950">
            Assume basic pantry staples
          </p>
          <p className="text-[11px] text-amber-900/80">
            Treat salt, black pepper, cooking oil, and sugar as already available.
          </p>
        </div>

        <button
          onClick={() => onUpdatePreferences({ assumePantryStaples: !preferences.assumePantryStaples })}
          type="button"
          role="switch"
          aria-checked={preferences.assumePantryStaples}
          className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-0.5 shrink-0 ${
            preferences.assumePantryStaples ? 'bg-amber-600' : 'bg-stone-300'
          }`}
        >
          <span
            className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
              preferences.assumePantryStaples ? 'translate-x-6' : 'translate-x-0'
            }`}
          />
        </button>
      </div>
    </div>
  );
};
