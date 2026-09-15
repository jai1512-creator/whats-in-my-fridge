import React, { useState } from 'react';
import { Sparkles, ArrowRight, CheckCircle2, Clock, Flame, UtensilsCrossed, RefreshCw } from 'lucide-react';
import { ActiveTab } from '../types';
import { handleImageError } from '../utils/imageFallback';

interface LandingHeroProps {
  onStartCooking: () => void;
  onOpenSurpriseMe: () => void;
  setActiveTab: (tab: ActiveTab) => void;
  fridgeCount: number;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  onStartCooking,
  onOpenSurpriseMe,
  setActiveTab,
  fridgeCount,
}) => {
  // Demo interactive transformation state
  const [demoStep, setDemoStep] = useState<'ingredients' | 'cooked'>('ingredients');

  const demoIngredients = [
    { name: 'Pasta', emoji: '🍝' },
    { name: 'Garlic', emoji: '🧄' },
    { name: 'Butter', emoji: '🧈' },
    { name: 'Parmesan', emoji: '🧀' },
  ];

  return (
    <div className="relative overflow-hidden pb-16 pt-8 sm:pt-14 lg:pt-20">
      {/* Background ambient warm glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-gradient-to-tr from-amber-200/40 via-orange-100/30 to-transparent blur-3xl -z-10 rounded-full pointer-events-none" />
      <div className="absolute -top-12 -left-20 w-72 h-72 bg-amber-100/50 rounded-full blur-2xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Copy & CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6 sm:space-y-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200/70 text-amber-800 text-xs font-semibold tracking-wide uppercase shadow-2xs">
              <span className="flex h-2 w-2 rounded-full bg-amber-500 animate-ping" />
              <span>Smart Kitchen Companion</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-stone-900 tracking-tight leading-[1.08]">
              What can you make with what you <span className="italic text-amber-700 font-serif">already have?</span>
            </h1>

            <p className="text-lg sm:text-xl text-stone-600 font-normal max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Tell us what’s in your fridge. We’ll find something delicious. Zero grocery store stress, zero food waste, and realistic substitutions when you're short on an item.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={onStartCooking}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-base flex items-center justify-center gap-3 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Start Cooking</span>
                <ArrowRight className="w-5 h-5 text-amber-400" />
              </button>

              <button
                onClick={onOpenSurpriseMe}
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white hover:bg-stone-50 text-stone-800 font-semibold text-base border border-stone-300 flex items-center justify-center gap-2.5 shadow-2xs hover:shadow-xs transition-all active:scale-98"
              >
                <Sparkles className="w-5 h-5 text-amber-500" />
                <span>Surprise Me 🎲</span>
              </button>
            </div>

            {/* Live Fridge Status Pill */}
            {fridgeCount > 0 && (
              <div className="pt-2">
                <button
                  onClick={() => setActiveTab(fridgeCount >= 5 ? 'discover' : 'ingredients')}
                  className="inline-flex items-center gap-2 text-xs font-medium text-stone-600 hover:text-stone-900 bg-stone-100/80 hover:bg-stone-200/70 px-3.5 py-1.5 rounded-full transition-colors cursor-pointer"
                >
                  <span className={`w-2 h-2 rounded-full inline-block ${fridgeCount >= 5 ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                  <span>
                    {fridgeCount >= 5 ? (
                      <>Your fridge has <strong>{fridgeCount} ingredients</strong> · Dishes unlocked! 🎉</>
                    ) : (
                      <>Your fridge has <strong>{fridgeCount} / 5 ingredients</strong> (Need {5 - fridgeCount} more to see dishes)</>
                    )}
                  </span>
                  <span className="text-amber-600 font-semibold underline ml-1">
                    {fridgeCount >= 5 ? 'View Dishes →' : 'Add Items →'}
                  </span>
                </button>
              </div>
            )}

            {/* Value Highlights */}
            <div className="pt-4 grid grid-cols-3 gap-4 border-t border-stone-200/80 max-w-lg mx-auto lg:mx-0">
              <div>
                <p className="text-2xl font-serif font-bold text-stone-900">35+</p>
                <p className="text-xs text-stone-500 font-medium">Curated Dishes</p>
              </div>
              <div>
                <p className="text-2xl font-serif font-bold text-stone-900">100%</p>
                <p className="text-xs text-stone-500 font-medium">Pantry Smart</p>
              </div>
              <div>
                <p className="text-2xl font-serif font-bold text-stone-900">&lt; 20m</p>
                <p className="text-xs text-stone-500 font-medium">Average Cook Time</p>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Transformation Interactive Demonstration */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Decorative Frame */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-xl border border-stone-200/90 relative">
                {/* Header tag */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-stone-100">
                  <div className="flex items-center gap-2">
                    <UtensilsCrossed className="w-4 h-4 text-amber-600" />
                    <span className="text-xs font-bold uppercase tracking-wider text-stone-700">
                      Live Magic Demo
                    </span>
                  </div>
                  <button
                    onClick={() => setDemoStep(prev => prev === 'ingredients' ? 'cooked' : 'ingredients')}
                    className="flex items-center gap-1.5 text-xs font-semibold text-amber-700 hover:text-amber-800 bg-amber-50 hover:bg-amber-100 px-2.5 py-1 rounded-full transition-colors"
                    title="Toggle ingredients vs finished dish"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>{demoStep === 'ingredients' ? 'Cook Dish' : 'Reset'}</span>
                  </button>
                </div>

                {demoStep === 'ingredients' ? (
                  /* Ingredients State */
                  <div className="space-y-4">
                    <p className="text-xs text-stone-500 font-medium">
                      Suppose you only have these 4 items lingering in your kitchen:
                    </p>

                    <div className="grid grid-cols-2 gap-3">
                      {demoIngredients.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#E8DFD5] shadow-2xs hover:border-amber-300 transition-colors"
                        >
                          <span className="text-2xl">{item.emoji}</span>
                          <div>
                            <span className="text-sm font-semibold text-stone-800 block">
                              {item.name}
                            </span>
                            <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> In fridge
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={() => setDemoStep('cooked')}
                        className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-xs transition-transform active:scale-98"
                      >
                        <Sparkles className="w-4 h-4" />
                        <span>Discover What You Can Cook →</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Plated Dish State */
                  <div className="space-y-4 animate-fadeIn">
                    <div className="relative rounded-2xl overflow-hidden aspect-4/3 group shadow-inner">
                      <img
                        src="https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80"
                        alt="Creamy Garlic Butter Pasta"
                        onError={handleImageError}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="eager"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                      <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-bold tracking-wide shadow-md flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>100% Match!</span>
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <span className="text-xs uppercase tracking-wider text-amber-300 font-semibold block mb-0.5">
                          Italian Classic
                        </span>
                        <h3 className="font-serif text-lg font-bold leading-tight drop-shadow-xs">
                          Creamy Garlic Butter Pasta
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-stone-600 bg-stone-50 p-3 rounded-xl border border-stone-200/70">
                      <div className="flex items-center gap-1.5 font-medium">
                        <Clock className="w-3.5 h-3.5 text-stone-400" />
                        <span>20 min</span>
                      </div>
                      <div className="flex items-center gap-1.5 font-medium">
                        <Flame className="w-3.5 h-3.5 text-amber-500" />
                        <span>Easy prep</span>
                      </div>
                      <span className="text-emerald-700 font-semibold bg-emerald-100/70 px-2 py-0.5 rounded-md">
                        0 items to buy!
                      </span>
                    </div>

                    <button
                      onClick={() => setActiveTab('discover')}
                      className="w-full py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors"
                    >
                      <span>Explore all matching dishes</span>
                      <ArrowRight className="w-4 h-4 text-amber-400" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 3-Step "How It Works" Bar */}
        <div className="mt-20 pt-12 border-t border-stone-200/80">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-700 block mb-1">
              Simple 3-Step Process
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              From hungry to dining in minutes
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white p-6 rounded-2xl border border-[#E8DFD5] shadow-2xs hover:shadow-xs transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-amber-100/70 text-amber-700 font-serif font-bold text-xl flex items-center justify-center mb-4">
                1
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-900 mb-2">
                Check Off Your Fridge
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Pick what you have: eggs, cheese, pasta, garlic, veggies. Or snap a quick photo of your fridge shelves to auto-detect.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E8DFD5] shadow-2xs hover:shadow-xs transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-amber-100/70 text-amber-700 font-serif font-bold text-xl flex items-center justify-center mb-4">
                2
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-900 mb-2">
                Discover Ranked Matches
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Our smart recipe engine ranks dishes by match percentage, highlighting what you have and realistic substitutes for anything missing.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E8DFD5] shadow-2xs hover:shadow-xs transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-amber-100/70 text-amber-700 font-serif font-bold text-xl flex items-center justify-center mb-4">
                3
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-900 mb-2">
                Hands-Free Cooking Mode
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Step-by-step guidance with extra-large counter text, built-in kitchen timers, audio chimes, and zero distractions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
