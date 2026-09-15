import { Clock, Flame, Heart, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { RecipeMatch } from '../types';
import { handleImageError } from '../utils/imageFallback';

interface RecipeCardProps {
  match: RecipeMatch;
  isFavorite: boolean;
  onToggleFavorite: (e: React.MouseEvent, recipeId: string) => void;
  onSelectRecipe: (match: RecipeMatch) => void;
  onOpenSubstitute: (e: React.MouseEvent, ingredientName: string) => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
  match,
  isFavorite,
  onToggleFavorite,
  onSelectRecipe,
  onOpenSubstitute,
}) => {
  const { recipe, matchPercentage, matchedIngredients, missingIngredients } = match;

  // Match score color badge
  const getMatchBadge = () => {
    if (matchPercentage === 100) {
      return {
        bg: 'bg-emerald-600',
        textColor: 'text-white',
        text: '100% Match',
        subtext: 'You have everything!',
      };
    }
    if (matchPercentage >= 80) {
      return {
        bg: 'bg-amber-500',
        textColor: 'text-white',
        text: `${matchPercentage}% Match`,
        subtext: 'Only 1 item missing',
      };
    }
    if (matchPercentage >= 60) {
      return {
        bg: 'bg-orange-500',
        textColor: 'text-white',
        text: `${matchPercentage}% Match`,
        subtext: 'A couple items missing',
      };
    }
    return {
      bg: 'bg-stone-600',
      textColor: 'text-white',
      text: `${matchPercentage}% Match`,
      subtext: `${missingIngredients.length} items missing`,
    };
  };

  const badge = getMatchBadge();

  return (
    <div
      onClick={() => onSelectRecipe(match)}
      className="bg-white rounded-3xl overflow-hidden border border-[#E8DFD5] shadow-xs hover:shadow-xl hover:border-amber-300 transition-all duration-300 flex flex-col group cursor-pointer transform hover:-translate-y-1"
    >
      {/* Recipe Photo & Overlay Badges */}
      <div className="relative aspect-16/10 overflow-hidden bg-stone-100">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={handleImageError}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Top Badges */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between">
          {/* Match Score Badge */}
          <div
            className={`px-3 py-1 rounded-full ${badge.bg} ${badge.textColor} text-xs font-bold tracking-tight shadow-md flex items-center gap-1.5`}
          >
            {matchPercentage === 100 ? (
              <CheckCircle2 className="w-3.5 h-3.5" />
            ) : (
              <Sparkles className="w-3.5 h-3.5" />
            )}
            <span>{badge.text}</span>
          </div>

          {/* Favorite Toggle Button */}
          <button
            onClick={e => onToggleFavorite(e, recipe.id)}
            className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs hover:bg-white text-stone-700 flex items-center justify-center transition-transform active:scale-90 shadow-sm"
            title={isFavorite ? 'Remove from favorites' : 'Save to favorites'}
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                isFavorite ? 'text-rose-500 fill-rose-500' : 'text-stone-600 hover:text-rose-500'
              }`}
            />
          </button>
        </div>

        {/* Bottom Image Overlay Tags */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-medium drop-shadow-sm">
          <span className="px-2.5 py-0.5 rounded-full bg-black/40 backdrop-blur-xs text-[11px] font-semibold uppercase tracking-wider text-amber-300">
            {recipe.cuisine} · {recipe.mealType}
          </span>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-full">
              <Clock className="w-3 h-3 text-amber-300" />
              <span>{recipe.totalTimeMinutes}m</span>
            </span>
            <span className="flex items-center gap-1 bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-full">
              <Flame className="w-3 h-3 text-orange-400" />
              <span>{recipe.difficulty}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Card Content Details */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="font-serif text-xl font-bold text-stone-900 group-hover:text-amber-800 transition-colors leading-snug">
            {recipe.name}
          </h3>
          <p className="text-xs text-stone-500 line-clamp-2 mt-1.5 leading-relaxed">
            {recipe.description}
          </p>
        </div>

        {/* You Have vs Missing Breakdown */}
        <div className="pt-2 border-t border-stone-100 space-y-2.5 text-xs">
          {/* You have summary */}
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="overflow-hidden">
              <span className="font-semibold text-stone-700">You have: </span>
              <span className="text-stone-500 truncate block">
                {matchedIngredients.slice(0, 3).join(', ')}
                {matchedIngredients.length > 3 ? ` +${matchedIngredients.length - 3} more` : ''}
              </span>
            </div>
          </div>

          {/* Missing summary */}
          {missingIngredients.length > 0 ? (
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-2 overflow-hidden">
                <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <div className="overflow-hidden">
                  <span className="font-semibold text-stone-700">Missing: </span>
                  <span className="text-amber-800 font-medium truncate block">
                    {missingIngredients.slice(0, 2).join(', ')}
                    {missingIngredients.length > 2 ? ` +${missingIngredients.length - 2} more` : ''}
                  </span>
                </div>
              </div>

              {/* Find Substitute Action Button */}
              <button
                onClick={e => onOpenSubstitute(e, missingIngredients[0])}
                className="shrink-0 text-[11px] font-bold text-amber-700 hover:text-amber-900 underline hover:no-underline bg-amber-50 px-2 py-0.5 rounded-md transition-colors"
                title="View substitution ideas for missing ingredients"
              >
                Find swap
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-emerald-700 font-semibold text-[11px] bg-emerald-50 px-2.5 py-1 rounded-lg">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>You already have almost everything you need!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
