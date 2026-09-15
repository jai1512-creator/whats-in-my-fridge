import React from 'react';
import { ChefHat, Heart, Sparkles, Utensils, BookOpen, ShieldCheck } from 'lucide-react';
import { ActiveTab } from '../types';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
  onOpenSurpriseMe: () => void;
  onOpenScanner: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  setActiveTab,
  onOpenSurpriseMe,
  onOpenScanner,
}) => {
  return (
    <footer className="mt-20 border-t border-stone-200 bg-white text-stone-700 pb-20 md:pb-12 pt-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-stone-100">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-700 flex items-center justify-center font-bold">
                <ChefHat className="w-5 h-5" />
              </div>
              <span className="font-serif text-xl font-bold text-stone-900">
                What's In My Fridge?
              </span>
            </div>
            <p className="text-stone-500 text-sm leading-relaxed max-w-sm">
              Discover delicious, restaurant-worthy meals crafted entirely from ingredients you already have at home. Cut grocery stress, eliminate household food waste, and fall in love with home cooking.
            </p>
            <div className="flex items-center gap-2 text-xs text-stone-400 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>100% Client-side privacy · No accounts required</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-900 block">
              Application
            </span>
            <ul className="space-y-2 text-sm text-stone-600">
              <li>
                <button
                  onClick={() => setActiveTab('home')}
                  className="hover:text-amber-700 transition-colors"
                >
                  Home & Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('ingredients')}
                  className="hover:text-amber-700 transition-colors"
                >
                  My Fridge Inventory
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('discover')}
                  className="hover:text-amber-700 transition-colors"
                >
                  Discover Dishes
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('favorites')}
                  className="hover:text-amber-700 transition-colors"
                >
                  Saved Favorites
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('history')}
                  className="hover:text-amber-700 transition-colors"
                >
                  Cooked History
                </button>
              </li>
            </ul>
          </div>

          {/* Special Tools */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-900 block">
              Smart Features
            </span>
            <div className="space-y-2.5">
              <button
                onClick={onOpenSurpriseMe}
                className="w-full text-left p-3 rounded-xl bg-[#FAF8F5] hover:bg-amber-50/70 border border-stone-200 flex items-center justify-between text-xs font-semibold text-stone-800 transition-colors group"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform" />
                  <span>Surprise Me 🎲 Roulette</span>
                </div>
                <span className="text-amber-700">Spin →</span>
              </button>

              <button
                onClick={onOpenScanner}
                className="w-full text-left p-3 rounded-xl bg-[#FAF8F5] hover:bg-amber-50/70 border border-stone-200 flex items-center justify-between text-xs font-semibold text-stone-800 transition-colors group"
              >
                <div className="flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-amber-600 group-hover:scale-110 transition-transform" />
                  <span>Fridge Photo Scanner Demo</span>
                </div>
                <span className="text-amber-700">Scan →</span>
              </button>

              <button
                onClick={() => setActiveTab('substitutions')}
                className="w-full text-left p-3 rounded-xl bg-[#FAF8F5] hover:bg-amber-50/70 border border-stone-200 flex items-center justify-between text-xs font-semibold text-stone-800 transition-colors group"
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
                  <span>Kitchen Substitutions Guide</span>
                </div>
                <span className="text-amber-700">Explore →</span>
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} What's In My Fridge? Built with care for delicious home meals.</p>
          <div className="flex items-center gap-1 text-stone-600">
            <span>Crafted with warm passion & fresh ingredients</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
