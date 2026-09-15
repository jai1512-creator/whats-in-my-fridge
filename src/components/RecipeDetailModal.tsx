import React, { useState, useEffect } from 'react';
import {
  X,
  Clock,
  Flame,
  Utensils,
  Heart,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Plus,
  Minus,
  ChefHat,
  Share2,
  Printer,
  BookOpen,
} from 'lucide-react';
import { RecipeMatch } from '../types';
import { findSubstitutionsFor } from '../data/substitutionsData';
import { formatFraction } from '../utils/formatters';
import { handleImageError } from '../utils/imageFallback';

interface RecipeDetailModalProps {
  match: RecipeMatch | null;
  onClose: () => void;
  onStartCookingMode: (match: RecipeMatch) => void;
  isFavorite: boolean;
  onToggleFavorite: (recipeId: string) => void;
  onOpenSubstitutionsGuide: (ingredientName: string) => void;
}

export const RecipeDetailModal: React.FC<RecipeDetailModalProps> = ({
  match,
  onClose,
  onStartCookingMode,
  isFavorite,
  onToggleFavorite,
  onOpenSubstitutionsGuide,
}) => {
  const [servings, setServings] = useState<number>(2);
  const [checkedIngredients, setCheckedIngredients] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (match) {
      setServings(match.recipe.servings || 2);
      setCheckedIngredients(new Set());
    }
  }, [match]);

  // Listen to Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!match) return null;

  const { recipe, matchPercentage, matchedIngredients, missingIngredients } = match;
  const originalServings = recipe.servings || 2;
  const scaleMultiplier = servings / originalServings;

  const toggleCheckIngredient = (ingName: string) => {
    const updated = new Set(checkedIngredients);
    if (updated.has(ingName)) {
      updated.delete(ingName);
    } else {
      updated.add(ingName);
    }
    setCheckedIngredients(updated);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: recipe.name,
        text: `Check out this delicious ${recipe.name} on What's In My Fridge!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Recipe link copied to clipboard!');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-stone-200 relative my-6 max-h-[92vh] flex flex-col">
        {/* Floating Top Action Bar */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          <button
            onClick={() => onToggleFavorite(recipe.id)}
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md hover:bg-white text-stone-700 flex items-center justify-center transition-transform active:scale-90 shadow-md"
            title="Save to favorites"
          >
            <Heart
              className={`w-5 h-5 ${
                isFavorite ? 'text-rose-500 fill-rose-500' : 'text-stone-600 hover:text-rose-500'
              }`}
            />
          </button>

          <button
            onClick={handleShare}
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md hover:bg-white text-stone-700 flex items-center justify-center transition-transform active:scale-90 shadow-md"
            title="Share recipe"
          >
            <Share2 className="w-5 h-5" />
          </button>

          <button
            onClick={handlePrint}
            className="hidden sm:flex w-10 h-10 rounded-full bg-white/90 backdrop-blur-md hover:bg-white text-stone-700 items-center justify-center transition-transform active:scale-90 shadow-md"
            title="Print recipe"
          >
            <Printer className="w-5 h-5" />
          </button>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-stone-900/80 hover:bg-stone-900 text-white flex items-center justify-center transition-transform active:scale-90 shadow-md"
            title="Close (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Container */}
        <div className="overflow-y-auto flex-1">
          {/* Hero Food Photography */}
          <div className="relative aspect-16/9 sm:aspect-21/9 w-full overflow-hidden bg-stone-900">
            <img
              src={recipe.image}
              alt={recipe.name}
              className="w-full h-full object-cover"
              onError={handleImageError}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-8 right-4 sm:right-8 text-white">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="px-3 py-1 rounded-full bg-amber-500/90 text-white text-xs font-bold uppercase tracking-wider">
                  {recipe.cuisine}
                </span>
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold">
                  {recipe.mealType}
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-bold flex items-center gap-1 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{matchPercentage}% Match</span>
                </span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight drop-shadow-md">
                {recipe.name}
              </h1>
              <p className="text-xs sm:text-sm text-stone-200 mt-1 line-clamp-1">
                {recipe.subtitle}
              </p>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-stone-200 border-b border-stone-200 bg-[#FAF8F5] text-stone-700 text-center py-3.5">
            <div className="p-2">
              <span className="text-[11px] uppercase tracking-wider text-stone-600 block">Total Time</span>
              <span className="font-serif text-base sm:text-lg font-bold text-stone-900 flex items-center justify-center gap-1 mt-0.5">
                <Clock className="w-4 h-4 text-amber-600" />
                {recipe.totalTimeMinutes} min
              </span>
            </div>
            <div className="p-2">
              <span className="text-[11px] uppercase tracking-wider text-stone-600 block">Difficulty</span>
              <span className="font-serif text-base sm:text-lg font-bold text-stone-900 flex items-center justify-center gap-1 mt-0.5">
                <Flame className="w-4 h-4 text-orange-500" />
                {recipe.difficulty}
              </span>
            </div>
            <div className="p-2">
              <span className="text-[11px] uppercase tracking-wider text-stone-600 block">Nutrition</span>
              <span className="font-serif text-base sm:text-lg font-bold text-stone-900 block mt-0.5">
                {recipe.calories} kcal
              </span>
            </div>
            <div className="p-2">
              <span className="text-[11px] uppercase tracking-wider text-stone-600 block">Macros (P/C/F)</span>
              <span className="text-xs font-bold text-stone-800 block mt-1">
                {recipe.proteinGrams}g · {recipe.carbsGrams}g · {recipe.fatGrams}g
              </span>
            </div>
          </div>

          {/* Main Content Sections */}
          <div className="p-6 sm:p-8 space-y-8">
            {/* Description */}
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              {recipe.description}
            </p>

            {/* Ingredients Section with Dynamic Servings Scaler */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
                <div>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 flex items-center gap-2">
                    <Utensils className="w-5 h-5 text-amber-600" />
                    <span>Ingredients</span>
                  </h2>
                  <span className="text-xs text-stone-500">
                    Check off ingredients as you prepare them
                  </span>
                </div>

                {/* Servings Scaler */}
                <div className="flex items-center gap-3 bg-stone-100/90 rounded-2xl px-3 py-1.5 border border-stone-200">
                  <span className="text-xs font-bold text-stone-600 uppercase tracking-wider">
                    Servings:
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setServings(Math.max(1, servings - 1))}
                      className="w-7 h-7 rounded-lg bg-white hover:bg-stone-200 text-stone-800 flex items-center justify-center shadow-2xs font-bold transition-colors"
                      title="Fewer servings"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-6 text-center font-serif text-base font-bold text-stone-900">
                      {servings}
                    </span>
                    <button
                      onClick={() => setServings(servings + 1)}
                      className="w-7 h-7 rounded-lg bg-white hover:bg-stone-200 text-stone-800 flex items-center justify-center shadow-2xs font-bold transition-colors"
                      title="More servings"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Ingredients Checklist */}
              <div className="mt-4 grid sm:grid-cols-2 gap-3">
                {recipe.ingredients.map((ing, idx) => {
                  const isAvailable = matchedIngredients.includes(ing.name);
                  const isChecked = checkedIngredients.has(ing.name);

                  // Calculate scaled amount
                  let displayAmount = ing.amount;
                  if (typeof ing.amount === 'number') {
                    displayAmount = formatFraction(ing.amount * scaleMultiplier);
                  }

                  return (
                    <div
                      key={idx}
                      onClick={() => toggleCheckIngredient(ing.name)}
                      className={`p-3.5 rounded-2xl border text-xs sm:text-sm flex items-start gap-3 cursor-pointer transition-all ${
                        isChecked
                          ? 'bg-stone-100 text-stone-400 border-stone-200 line-through'
                          : isAvailable
                          ? 'bg-[#FAF8F5] border-stone-200/90 text-stone-800 hover:border-amber-300'
                          : 'bg-amber-50/50 border-amber-200 text-amber-950 hover:border-amber-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="mt-0.5 rounded text-amber-600 focus:ring-amber-500 cursor-pointer"
                      />
                      <div className="flex-1">
                        <span className="font-bold">
                          {displayAmount} {ing.unit}
                        </span>{' '}
                        <span>{ing.name}</span>
                        {ing.optional && (
                          <span className="text-[11px] text-stone-500 ml-1 font-normal">
                            (optional)
                          </span>
                        )}

                        {/* Availability Tag */}
                        {!isChecked && (
                          <div className="mt-1 flex items-center gap-1.5 text-[11px]">
                            {isAvailable ? (
                              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3" /> In your fridge
                              </span>
                            ) : (
                              <span className="text-amber-800 font-semibold flex items-center gap-1">
                                <AlertCircle className="w-3 h-3 text-amber-500" /> Missing
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Ingredient Substitutions Callout (if any missing) */}
            {missingIngredients.length > 0 && (
              <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-amber-700" />
                    <h3 className="font-serif text-sm font-bold text-amber-950">
                      Culinary Substitutions for Missing Items
                    </h3>
                  </div>
                  <span className="text-xs text-amber-700">Realistic kitchen swaps</span>
                </div>

                <div className="space-y-2">
                  {missingIngredients.map(item => {
                    const subs = findSubstitutionsFor(item);
                    return (
                      <div
                        key={item}
                        className="p-3 bg-white rounded-xl border border-amber-200/80 text-xs text-stone-700 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                      >
                        <div>
                          <strong className="text-stone-900 block font-semibold">Missing: {item}</strong>
                          {subs && subs.length > 0 ? (
                            <span className="text-stone-600">
                              Swap with: <strong className="text-amber-800">{subs[0].name}</strong> ({subs[0].ratio})
                            </span>
                          ) : (
                            <span className="text-stone-500">
                              Can often be omitted or replaced with a neutral substitute.
                            </span>
                          )}
                        </div>

                        <button
                          onClick={() => onOpenSubstitutionsGuide(item)}
                          className="shrink-0 text-xs font-bold text-amber-700 hover:text-amber-900 bg-amber-100 hover:bg-amber-200 px-3 py-1 rounded-lg transition-colors"
                        >
                          View why it works →
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step-by-Step Cooking Instructions */}
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 pb-4 border-b border-stone-200 flex items-center gap-2">
                <ChefHat className="w-5 h-5 text-amber-600" />
                <span>Instructions</span>
              </h2>

              <div className="mt-4 space-y-4">
                {recipe.steps.map(step => (
                  <div
                    key={step.stepNumber}
                    className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F5] border border-stone-200/80 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold text-xs">
                        Step {step.stepNumber}
                      </span>
                      {step.timerMinutes && (
                        <span className="flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
                          <Clock className="w-3 h-3" />
                          <span>{step.timerMinutes} min timer</span>
                        </span>
                      )}
                    </div>

                    <p className="text-stone-800 text-sm sm:text-base leading-relaxed">
                      {step.instruction}
                    </p>

                    {step.tip && (
                      <div className="pt-2 text-xs text-stone-500 italic flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span>Chef tip: {step.tip}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Floating Bar with Primary CTA */}
        <div className="p-4 sm:p-6 bg-white border-t border-stone-200 flex items-center justify-between gap-4">
          <div className="hidden sm:block">
            <span className="text-xs text-stone-500 block">Ready to cook?</span>
            <span className="font-serif text-sm font-bold text-stone-900">
              Distraction-Free Cooking Mode
            </span>
          </div>

          <button
            onClick={() => onStartCookingMode(match)}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-lg hover:shadow-xl transition-all active:scale-98"
          >
            <ChefHat className="w-5 h-5 text-amber-400" />
            <span>Start Cooking Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};
