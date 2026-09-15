import React from 'react';
import { Heart, Sparkles, ArrowRight, Utensils } from 'lucide-react';
import { RecipeCard } from './RecipeCard';
import { ActiveTab, RecipeMatch } from '../types';

interface FavoritesViewProps {
  favoriteMatches: RecipeMatch[];
  favoriteIds: string[];
  onToggleFavorite: (e: React.MouseEvent, recipeId: string) => void;
  onSelectRecipe: (match: RecipeMatch) => void;
  onOpenSubstitute: (e: React.MouseEvent, ingredientName: string) => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  favoriteMatches,
  favoriteIds,
  onToggleFavorite,
  onSelectRecipe,
  onOpenSubstitute,
  setActiveTab,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="pb-6 border-b border-stone-200">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-semibold mb-2">
          <Heart className="w-3.5 h-3.5 fill-rose-600 text-rose-600" />
          <span>Saved Dishes</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
          Your Favorite Recipes
        </h1>
        <p className="text-stone-600 text-sm sm:text-base mt-1">
          Dishes you love, with live match calculations reflecting what’s currently in your fridge.
        </p>
      </div>

      {favoriteMatches.length === 0 ? (
        /* Empty State */
        <div className="mt-12 bg-white rounded-3xl p-10 sm:p-14 text-center border border-stone-200 shadow-sm max-w-lg mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 mx-auto flex items-center justify-center">
            <Heart className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-stone-900">
            No favorite recipes saved yet
          </h2>
          <p className="text-stone-500 text-sm leading-relaxed">
            Click the heart icon on any recipe card to save it here for quick access next time you're cooking.
          </p>
          <button
            onClick={() => setActiveTab('discover')}
            className="mt-2 px-6 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-sm inline-flex items-center gap-2 shadow-xs transition-colors"
          >
            <span>Browse Recipes</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </button>
        </div>
      ) : (
        /* Favorites Grid */
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteMatches.map(match => (
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
      )}
    </div>
  );
};
