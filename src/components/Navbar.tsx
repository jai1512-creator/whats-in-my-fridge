import React from 'react';
import { ChefHat, Heart, History, BookOpen, Refrigerator, Search, RotateCcw } from 'lucide-react';
import { ActiveTab } from '../types';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  fridgeCount: number;
  favoritesCount: number;
  onOpenSurpriseMe?: () => void;
  onOpenScanner?: () => void;
  onResetFridge?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  fridgeCount,
  favoritesCount,
  onOpenSurpriseMe,
  onResetFridge,
}) => {
  return (
    <>
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#EADFD2] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-3 sm:gap-6">
            {/* Logo */}
            <button
              onClick={() => setActiveTab('home')}
              className="flex items-center gap-3 group text-left focus:outline-none shrink-0 cursor-pointer"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-600 group-hover:scale-105 transition-transform shrink-0">
                <ChefHat className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="flex flex-col justify-center shrink-0">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-stone-900 block leading-tight whitespace-nowrap">
                  What's In My Fridge?
                </span>
                <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-stone-600 font-semibold hidden sm:block whitespace-nowrap mt-0.5">
                  Zero Waste · Smart Cooking
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 bg-stone-100/80 p-1.5 rounded-full border border-stone-200/80 shadow-xs shrink-0">
              <button
                onClick={() => setActiveTab('home')}
                className={`px-3 xl:px-4 py-1.5 xl:py-2 rounded-full text-xs xl:text-sm font-medium transition-all cursor-pointer ${
                  activeTab === 'home'
                    ? 'bg-white text-stone-900 shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-white/60'
                }`}
              >
                Home
              </button>

              <button
                onClick={() => setActiveTab('ingredients')}
                className={`flex items-center gap-1.5 xl:gap-2 px-3 xl:px-4 py-1.5 xl:py-2 rounded-full text-xs xl:text-sm font-medium transition-all cursor-pointer ${
                  activeTab === 'ingredients'
                    ? 'bg-white text-stone-900 shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-white/60'
                }`}
              >
                <Refrigerator className="w-3.5 xl:w-4 h-3.5 xl:h-4 text-amber-600" />
                <span>My Fridge</span>
                {fridgeCount > 0 && (
                  <span className="ml-0.5 px-1.5 xl:px-2 py-0.5 text-[10px] xl:text-xs font-bold rounded-full bg-amber-500 text-white">
                    {fridgeCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('discover')}
                className={`flex items-center gap-1.5 xl:gap-2 px-3 xl:px-4 py-1.5 xl:py-2 rounded-full text-xs xl:text-sm font-medium transition-all cursor-pointer ${
                  activeTab === 'discover'
                    ? 'bg-white text-stone-900 shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-white/60'
                }`}
              >
                <Search className="w-3.5 xl:w-4 h-3.5 xl:h-4 text-stone-600" />
                <span>Discover</span>
                {fridgeCount < 5 ? (
                  <span
                    className="ml-0.5 px-1.5 xl:px-2 py-0.5 text-[10px] xl:text-[11px] font-bold rounded-full bg-amber-100 text-amber-800 border border-amber-200"
                    title="Choose at least 5 ingredients to unlock dishes"
                  >
                    {fridgeCount}/5
                  </span>
                ) : (
                  <span className="ml-0.5 px-1.5 xl:px-2 py-0.5 text-[10px] xl:text-[11px] font-bold rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                    Unlocked
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('favorites')}
                className={`flex items-center gap-1.5 xl:gap-2 px-3 xl:px-4 py-1.5 xl:py-2 rounded-full text-xs xl:text-sm font-medium transition-all cursor-pointer ${
                  activeTab === 'favorites'
                    ? 'bg-white text-stone-900 shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-white/60'
                }`}
              >
                <Heart className={`w-3.5 xl:w-4 h-3.5 xl:h-4 ${favoritesCount > 0 ? 'text-rose-500 fill-rose-500' : 'text-stone-600'}`} />
                <span>Favorites</span>
                {favoritesCount > 0 && (
                  <span className="ml-0.5 px-1.5 xl:px-2 py-0.5 text-[10px] xl:text-xs font-bold rounded-full bg-rose-100 text-rose-700">
                    {favoritesCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('substitutions')}
                className={`flex items-center gap-1.5 xl:gap-2 px-3 xl:px-4 py-1.5 xl:py-2 rounded-full text-xs xl:text-sm font-medium transition-all cursor-pointer ${
                  activeTab === 'substitutions'
                    ? 'bg-white text-stone-900 shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-white/60'
                }`}
              >
                <BookOpen className="w-3.5 xl:w-4 h-3.5 xl:h-4 text-emerald-600" />
                <span>Substitutes</span>
              </button>

              <button
                onClick={() => setActiveTab('history')}
                className={`flex items-center gap-1.5 xl:gap-2 px-3 xl:px-4 py-1.5 xl:py-2 rounded-full text-xs xl:text-sm font-medium transition-all cursor-pointer ${
                  activeTab === 'history'
                    ? 'bg-white text-stone-900 shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-white/60'
                }`}
              >
                <History className="w-3.5 xl:w-4 h-3.5 xl:h-4 text-stone-600" />
                <span>Cooked</span>
              </button>
            </nav>

            {/* Quick Action Button */}
            {onResetFridge && (
              <div className="flex items-center shrink-0">
                <button
                  onClick={onResetFridge}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 border border-stone-200/80 transition-all hover:shadow-2xs active:scale-95 cursor-pointer shrink-0"
                  title="Reset fridge to default pantry staples and clear all active filters"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-amber-700" />
                  <span>Reset Fridge</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-stone-200 px-2 py-1.5 flex items-center justify-around shadow-lg">
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg text-xs font-medium transition-colors ${
            activeTab === 'home' ? 'text-amber-600 font-bold' : 'text-stone-500'
          }`}
        >
          <ChefHat className="w-5 h-5 mb-0.5" />
          <span>Home</span>
        </button>

        <button
          onClick={() => setActiveTab('ingredients')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg text-xs font-medium relative transition-colors ${
            activeTab === 'ingredients' ? 'text-amber-600 font-bold' : 'text-stone-500'
          }`}
        >
          <div className="relative">
            <Refrigerator className="w-5 h-5 mb-0.5" />
            {fridgeCount > 0 && (
              <span className="absolute -top-1 -right-2.5 w-4 h-4 rounded-full bg-amber-500 text-white text-[10px] font-bold flex items-center justify-center">
                {fridgeCount}
              </span>
            )}
          </div>
          <span>Fridge</span>
        </button>

        <button
          onClick={() => setActiveTab('discover')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
            activeTab === 'discover' ? 'text-amber-600 font-bold' : 'text-stone-500'
          }`}
        >
          <div className="relative">
            <Search className="w-5 h-5 mb-0.5" />
            {fridgeCount < 5 && (
              <span className="absolute -top-1 -right-3 px-1 py-0.2 rounded-full bg-amber-500 text-white text-[9px] font-bold flex items-center justify-center">
                {fridgeCount}/5
              </span>
            )}
          </div>
          <span>Discover</span>
        </button>

        <button
          onClick={() => setActiveTab('favorites')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg text-xs font-medium relative transition-colors ${
            activeTab === 'favorites' ? 'text-rose-600 font-bold' : 'text-stone-500'
          }`}
        >
          <div className="relative">
            <Heart className={`w-5 h-5 mb-0.5 ${favoritesCount > 0 ? 'text-rose-500 fill-rose-500' : ''}`} />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-2.5 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                {favoritesCount}
              </span>
            )}
          </div>
          <span>Saved</span>
        </button>

        <button
          onClick={() => setActiveTab('substitutions')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg text-xs font-medium transition-colors ${
            activeTab === 'substitutions' ? 'text-emerald-600 font-bold' : 'text-stone-500'
          }`}
        >
          <BookOpen className="w-5 h-5 mb-0.5" />
          <span>Swaps</span>
        </button>
      </nav>
    </>
  );
};
