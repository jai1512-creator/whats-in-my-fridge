import React, { useState, useEffect } from 'react';
import { X, Sparkles, ChefHat, Clock, Flame, RotateCcw, CheckCircle2, Lock } from 'lucide-react';
import { RecipeMatch } from '../types';
import { handleImageError } from '../utils/imageFallback';

interface SurpriseMeModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableMatches: RecipeMatch[];
  onSelectRecipe: (match: RecipeMatch) => void;
  onStartCooking: (match: RecipeMatch) => void;
  fridgeCount?: number;
  onGoToIngredients?: () => void;
}

export const SurpriseMeModal: React.FC<SurpriseMeModalProps> = ({
  isOpen,
  onClose,
  availableMatches,
  onSelectRecipe,
  onStartCooking,
  fridgeCount,
  onGoToIngredients,
}) => {
  const [isShuffling, setIsShuffling] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [chosenMatch, setChosenMatch] = useState<RecipeMatch | null>(null);

  // Pool of recipes to pick from: prefer high match percentage dishes (>=50%), or all dishes if empty
  const candidatePool = availableMatches.length > 0 ? availableMatches : [];

  const startShuffle = () => {
    if (candidatePool.length === 0) return;

    setIsShuffling(true);
    setChosenMatch(null);

    let count = 0;
    const maxSteps = 18;
    const interval = window.setInterval(() => {
      setCurrentIndex(Math.floor(Math.random() * candidatePool.length));
      count++;
      if (count >= maxSteps) {
        clearInterval(interval);
        // Final selection: pick the best available match or random high match
        const topCandidates = candidatePool.slice(0, Math.min(6, candidatePool.length));
        const finalChoice = topCandidates[Math.floor(Math.random() * topCandidates.length)];
        setChosenMatch(finalChoice);
        setIsShuffling(false);
      }
    }, 90);
  };

  useEffect(() => {
    if (isOpen && (fridgeCount === undefined || fridgeCount >= 5)) {
      startShuffle();
    }
  }, [isOpen, fridgeCount]);

  if (!isOpen) return null;

  const isBelowMinimum = fridgeCount !== undefined && fridgeCount < 5;
  const currentPreview = candidatePool[currentIndex] || candidatePool[0];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200 relative my-8 text-center p-6 sm:p-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors cursor-pointer"
          title="Close (Esc)"
        >
          <X className="w-5 h-5" />
        </button>

        {isBelowMinimum ? (
          /* Below 5 items minimum state */
          <div className="py-6 space-y-6">
            <div className="w-16 h-16 rounded-3xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto text-3xl shadow-2xs">
              <Lock className="w-8 h-8 text-amber-600" />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
                <span>At Least 5 Items Required</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
                Choose 5 items to spin the roulette!
              </h2>
              <p className="text-stone-600 text-sm max-w-sm mx-auto leading-relaxed">
                The Surprise Me roulette needs at least <strong>5 ingredients</strong> in your fridge to discover a delicious matching dish.
              </p>
            </div>

            {/* Progress indicator */}
            <div className="max-w-xs mx-auto space-y-1.5 pt-1">
              <div className="w-full h-2.5 bg-stone-100 border border-stone-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, Math.round((fridgeCount / 5) * 100))}%` }}
                />
              </div>
              <span className="text-xs font-semibold text-stone-500">
                {fridgeCount} / 5 ingredients selected ({5 - fridgeCount} more needed)
              </span>
            </div>

            <div className="pt-2 flex flex-col gap-2.5">
              <button
                onClick={onGoToIngredients || onClose}
                className="w-full py-3.5 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-sm shadow-md transition-all active:scale-98 cursor-pointer"
              >
                Add Ingredients (Need {5 - fridgeCount} more) →
              </button>
              <button
                onClick={onClose}
                className="w-full py-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : isShuffling ? (
          /* Shuffling / Searching Animation State */
          <div className="py-8 space-y-6 animate-pulse">
            <div className="w-16 h-16 rounded-3xl bg-amber-500/15 text-amber-600 flex items-center justify-center mx-auto text-3xl">
              🎲
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest text-amber-600 font-bold block mb-1">
                Checking your fridge...
              </span>
              <h2 className="font-serif text-2xl font-bold text-stone-900">
                Finding tonight's inspiration
              </h2>
            </div>

            {/* Rapid preview photo carousel */}
            {currentPreview && (
              <div className="relative rounded-2xl overflow-hidden aspect-16/10 shadow-md border border-stone-200">
                <img
                  src={currentPreview.recipe.image}
                  alt={currentPreview.recipe.name}
                  className="w-full h-full object-cover scale-105"
                  onError={handleImageError}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-3 inset-x-3 text-white text-sm font-bold font-serif truncate">
                  {currentPreview.recipe.name}
                </div>
              </div>
            )}
          </div>
        ) : chosenMatch ? (
          /* Revealed Recipe State */
          <div className="space-y-6 animate-scaleUp">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Tonight you're making...</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
                {chosenMatch.recipe.name}
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                {chosenMatch.recipe.subtitle}
              </p>
            </div>

            {/* Revealed Hero Image */}
            <div className="relative rounded-2xl overflow-hidden aspect-16/10 shadow-lg border border-stone-200 group">
              <img
                src={chosenMatch.recipe.image}
                alt={chosenMatch.recipe.name}
                className="w-full h-full object-cover"
                onError={handleImageError}
              />
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-bold shadow-md flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>{chosenMatch.matchPercentage}% Match</span>
              </div>

              <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-xs text-white text-xs font-medium flex items-center gap-2">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-amber-300" />
                  <span>{chosenMatch.recipe.totalTimeMinutes}m</span>
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Flame className="w-3 h-3 text-orange-400" />
                  <span>{chosenMatch.recipe.difficulty}</span>
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-2">
              <button
                onClick={() => {
                  onStartCooking(chosenMatch);
                  onClose();
                }}
                className="w-full py-4 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-base flex items-center justify-center gap-2.5 shadow-lg active:scale-98 transition-all"
              >
                <ChefHat className="w-5 h-5 text-amber-400" />
                <span>Let's Cook!</span>
              </button>

              <div className="flex gap-2.5">
                <button
                  onClick={() => {
                    onSelectRecipe(chosenMatch);
                    onClose();
                  }}
                  className="flex-1 py-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs sm:text-sm transition-colors"
                >
                  View Full Details
                </button>

                <button
                  onClick={startShuffle}
                  className="flex-1 py-3 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-700 font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-amber-600" />
                  <span>Spin Again 🎲</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-8 text-stone-500">
            <p>No dishes found to surprise with. Try adding ingredients to your fridge!</p>
          </div>
        )}
      </div>
    </div>
  );
};
