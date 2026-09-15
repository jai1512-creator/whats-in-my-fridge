import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Utensils,
  CheckCircle2,
  Star,
  Clock,
  Volume2,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { RecipeMatch } from '../types';
import { playTimerChime } from '../utils/audioAlert';

interface CookingModeModalProps {
  match: RecipeMatch | null;
  onClose: () => void;
  onCookedFinished: (recipeId: string, recipeName: string, recipeImage: string, totalTime: number, rating: number) => void;
}

export const CookingModeModal: React.FC<CookingModeModalProps> = ({
  match,
  onClose,
  onCookedFinished,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [timerSecondsLeft, setTimerSecondsLeft] = useState<number | null>(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showIngredientsDrawer, setShowIngredientsDrawer] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [userRating, setUserRating] = useState<number>(5);

  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!match) return;
    setCurrentStepIndex(0);
    setIsCompleted(false);
    setShowIngredientsDrawer(false);
  }, [match]);

  const steps = match?.recipe.steps || [];
  const currentStep = steps[currentStepIndex];

  // Initialize timer if step has one
  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsTimerRunning(false);

    if (currentStep?.timerMinutes) {
      setTimerSecondsLeft(currentStep.timerMinutes * 60);
    } else if (currentStep?.timerSeconds) {
      setTimerSecondsLeft(currentStep.timerSeconds);
    } else {
      setTimerSecondsLeft(null);
    }
  }, [currentStepIndex, currentStep]);

  // Timer countdown loop
  useEffect(() => {
    if (isTimerRunning && timerSecondsLeft !== null && timerSecondsLeft > 0) {
      timerRef.current = window.setInterval(() => {
        setTimerSecondsLeft(prev => {
          if (prev !== null && prev > 1) {
            return prev - 1;
          }
          // Timer reached zero!
          setIsTimerRunning(false);
          playTimerChime();
          return 0;
        });
      }, 1000);
    } else if (timerSecondsLeft === 0) {
      setIsTimerRunning(false);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning, timerSecondsLeft]);

  // Keyboard navigation: Left/Right arrows, Space to toggle timer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        goToNextStep();
      } else if (e.key === 'ArrowLeft') {
        goToPrevStep();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStepIndex, steps.length]);

  if (!match) return null;

  const goToNextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      // Finished all steps!
      triggerCompletion();
    }
  };

  const goToPrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const triggerCompletion = () => {
    setIsCompleted(true);
    // Fire festive celebratory confetti
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const handleFinishAndSave = () => {
    onCookedFinished(
      match.recipe.id,
      match.recipe.name,
      match.recipe.image,
      match.recipe.totalTimeMinutes,
      userRating
    );
    onClose();
  };

  const formatTimerTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = Math.round(((currentStepIndex + 1) / steps.length) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950 text-white flex flex-col justify-between animate-fadeIn">
      {/* Top Bar */}
      <header className="px-6 py-4 border-b border-stone-800 flex items-center justify-between gap-4 bg-stone-900/60 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white flex items-center justify-center transition-colors"
            title="Exit Cooking Mode (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
          <div>
            <span className="text-[11px] uppercase tracking-wider text-amber-400 font-semibold block">
              Cooking Mode
            </span>
            <h2 className="font-serif text-lg sm:text-xl font-bold truncate max-w-md">
              {match.recipe.name}
            </h2>
          </div>
        </div>

        {/* Progress and Drawer Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowIngredientsDrawer(!showIngredientsDrawer)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              showIngredientsDrawer
                ? 'bg-amber-500 text-stone-950 font-bold'
                : 'bg-stone-800 hover:bg-stone-700 text-stone-200'
            }`}
          >
            <Utensils className="w-4 h-4" />
            <span className="hidden sm:inline">Ingredients</span>
          </button>

          <div className="text-right">
            <span className="text-xs font-bold text-stone-300">
              Step {currentStepIndex + 1} of {steps.length}
            </span>
            <div className="w-24 sm:w-32 h-2 bg-stone-800 rounded-full mt-1 overflow-hidden">
              <div
                className="h-full bg-amber-500 transition-all duration-300 rounded-full"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Cooking Viewport or Celebration View */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Step Content Card */}
        <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-12 lg:p-16 max-w-4xl mx-auto text-center w-full">
          {!isCompleted ? (
            <div className="space-y-8 animate-fadeIn w-full">
              {/* Step indicator pill */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-sm font-bold tracking-wide uppercase">
                <span>Step {currentStepIndex + 1}</span>
              </div>

              {/* Extra-large legible instruction text */}
              <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-medium leading-relaxed sm:leading-tight text-stone-100 max-w-3xl mx-auto drop-shadow-sm">
                {currentStep?.instruction}
              </h1>

              {/* Chef Tip */}
              {currentStep?.tip && (
                <div className="max-w-xl mx-auto p-4 rounded-2xl bg-stone-900/80 border border-stone-800 text-stone-300 text-xs sm:text-sm flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{currentStep.tip}</span>
                </div>
              )}

              {/* Interactive Countdown Timer (if step requires one) */}
              {timerSecondsLeft !== null && (
                <div className="max-w-sm mx-auto p-6 rounded-3xl bg-stone-900/90 border border-amber-500/40 shadow-2xl flex flex-col items-center gap-4 animate-pulse-glow">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-amber-400 font-bold">
                    <Clock className="w-4 h-4" />
                    <span>Kitchen Timer</span>
                  </div>

                  <div className="font-mono text-5xl sm:text-6xl font-bold tracking-wider text-white">
                    {formatTimerTime(timerSecondsLeft)}
                  </div>

                  {timerSecondsLeft === 0 && (
                    <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold animate-bounce">
                      <Volume2 className="w-4 h-4" />
                      <span>Time's up! Great job!</span>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsTimerRunning(!isTimerRunning)}
                      className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm flex items-center gap-2 shadow-md transition-all active:scale-95"
                    >
                      {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      <span>{isTimerRunning ? 'Pause' : 'Start Timer'}</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsTimerRunning(false);
                        if (currentStep?.timerMinutes) setTimerSecondsLeft(currentStep.timerMinutes * 60);
                      }}
                      className="p-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 flex items-center justify-center transition-colors"
                      title="Reset timer"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Celebration Card */
            <div className="space-y-6 max-w-lg mx-auto bg-stone-900/90 p-8 sm:p-10 rounded-3xl border border-stone-800 shadow-2xl animate-scaleUp">
              <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-widest text-amber-400 font-bold block mb-1">
                  Bon Appétit!
                </span>
                <h2 className="font-serif text-3xl font-bold text-white">
                  You cooked {match.recipe.name}!
                </h2>
                <p className="text-sm text-stone-400 mt-2">
                  Another delicious meal created using what you had on hand. Zero waste, chef-approved.
                </p>
              </div>

              {/* Star Rating */}
              <div className="space-y-2 pt-2 border-t border-stone-800">
                <span className="text-xs text-stone-400 block">How did it turn out?</span>
                <div className="flex items-center justify-center gap-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      onClick={() => setUserRating(star)}
                      className="p-1 hover:scale-125 transition-transform"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          star <= userRating
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-stone-600'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleFinishAndSave}
                  className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm shadow-md transition-all active:scale-95"
                >
                  Save to History & Close
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Slide-out Ingredients Quick-Reference Drawer */}
        {showIngredientsDrawer && (
          <aside className="w-80 sm:w-96 bg-stone-900 border-l border-stone-800 p-6 overflow-y-auto flex flex-col justify-between shrink-0 shadow-2xl animate-slideInRight">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-stone-800">
                <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-amber-500" />
                  <span>Recipe Ingredients</span>
                </h3>
                <button
                  onClick={() => setShowIngredientsDrawer(false)}
                  className="p-1 text-stone-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-4 space-y-2.5 text-sm">
                {match.recipe.ingredients.map((ing, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-xl bg-stone-800/60 text-stone-300 flex items-center justify-between"
                  >
                    <span>{ing.name}</span>
                    <span className="font-bold text-amber-400">
                      {ing.amount} {ing.unit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-xs text-stone-500 pt-6 border-t border-stone-800 text-center">
              Press Esc or click X to close drawer
            </p>
          </aside>
        )}
      </div>

      {/* Bottom Sticky Control Bar */}
      {!isCompleted && (
        <footer className="px-6 py-4 border-t border-stone-800 bg-stone-900/60 backdrop-blur-md flex items-center justify-between gap-4">
          <button
            onClick={goToPrevStep}
            disabled={currentStepIndex === 0}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-stone-800 hover:bg-stone-700 disabled:opacity-30 disabled:cursor-not-allowed text-stone-200 font-semibold text-sm transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Previous</span>
          </button>

          <span className="text-xs text-stone-500 hidden sm:inline">
            Use <strong>←</strong> / <strong>→</strong> arrow keys to navigate
          </span>

          <button
            onClick={goToNextStep}
            className="flex items-center gap-2 px-7 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm shadow-md transition-all active:scale-95"
          >
            <span>{currentStepIndex === steps.length - 1 ? 'Finish Dish 🎉' : 'Next Step'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </footer>
      )}
    </div>
  );
};
