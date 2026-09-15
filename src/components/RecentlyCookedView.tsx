import React from 'react';
import { History, Star, Clock, ChefHat, Trash2, ArrowRight } from 'lucide-react';
import { ActiveTab, RecentlyCookedItem } from '../types';
import { formatRelativeTime } from '../utils/formatters';
import { handleImageError } from '../utils/imageFallback';

interface RecentlyCookedViewProps {
  items: RecentlyCookedItem[];
  onClearHistory: () => void;
  onCookAgain: (recipeId: string) => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export const RecentlyCookedView: React.FC<RecentlyCookedViewProps> = ({
  items,
  onClearHistory,
  onCookAgain,
  setActiveTab,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/70 text-amber-900 text-xs font-semibold mb-2">
            <History className="w-3.5 h-3.5 text-amber-700" />
            <span>Kitchen Log</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
            Recently Cooked Dishes
          </h1>
          <p className="text-stone-600 text-sm sm:text-base mt-1">
            Track your homemade meals, cooking dates, and personal ratings.
          </p>
        </div>

        {items.length > 0 && (
          <button
            onClick={onClearHistory}
            className="flex items-center gap-1.5 text-xs font-medium text-stone-500 hover:text-rose-600 px-3 py-1.5 rounded-lg hover:bg-rose-50 transition-colors self-start sm:self-auto"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear history</span>
          </button>
        )}
      </div>

      {items.length === 0 ? (
        /* Empty State */
        <div className="mt-12 bg-white rounded-3xl p-10 sm:p-14 text-center border border-stone-200 shadow-sm max-w-lg mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-stone-100 text-stone-400 mx-auto flex items-center justify-center">
            <ChefHat className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-stone-900">
            Haven't cooked anything yet today
          </h2>
          <p className="text-stone-500 text-sm leading-relaxed">
            Pick a recipe, hit "Start Cooking", and once you complete all steps your dish will appear here!
          </p>
          <button
            onClick={() => setActiveTab('discover')}
            className="mt-2 px-6 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-sm inline-flex items-center gap-2 shadow-xs transition-colors"
          >
            <span>Discover Recipes</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </button>
        </div>
      ) : (
        /* List of Cooked Meals */
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="relative aspect-16/10 overflow-hidden bg-stone-100">
                <img
                  src={item.recipeImage}
                  alt={item.recipeName}
                  className="w-full h-full object-cover"
                  onError={handleImageError}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-xs text-white text-[11px] font-medium flex items-center gap-1">
                  <Clock className="w-3 h-3 text-amber-400" />
                  <span>{item.totalTimeMinutes}m cook</span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[11px] text-amber-300 font-semibold uppercase tracking-wider block">
                    {formatRelativeTime(item.cookedAt)}
                  </span>
                  <h3 className="font-serif text-lg font-bold leading-tight drop-shadow-xs">
                    {item.recipeName}
                  </h3>
                </div>
              </div>

              <div className="p-5 flex items-center justify-between gap-4">
                {/* Rating Display */}
                <div>
                  <span className="text-[10px] text-stone-400 uppercase tracking-wider font-semibold block mb-0.5">
                    Your Rating
                  </span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star
                        key={star}
                        className={`w-3.5 h-3.5 ${
                          star <= (item.rating || 5)
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-stone-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Cook Again Button */}
                <button
                  onClick={() => onCookAgain(item.recipeId)}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-2xs transition-colors"
                >
                  <ChefHat className="w-3.5 h-3.5" />
                  <span>Cook Again</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
