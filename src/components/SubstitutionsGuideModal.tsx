import React, { useState, useEffect } from 'react';
import { X, Search, BookOpen, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { SUBSTITUTIONS_DATABASE } from '../data/substitutionsData';

interface SubstitutionsGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

export const SubstitutionsGuideModal: React.FC<SubstitutionsGuideModalProps> = ({
  isOpen,
  onClose,
  initialQuery = '',
}) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    if (initialQuery) {
      setSearchQuery(initialQuery);
    }
  }, [initialQuery]);

  if (!isOpen) return null;

  const categories = ['all', ...Array.from(new Set(SUBSTITUTIONS_DATABASE.map(s => s.category)))];

  const filteredItems = SUBSTITUTIONS_DATABASE.filter(item => {
    if (selectedCategory !== 'all' && item.category !== selectedCategory) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const inName = item.ingredient.toLowerCase().includes(q);
      const inSub = item.substitutes.some(s =>
        s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)
      );
      return inName || inSub;
    }
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-stone-200 relative my-6 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 border-b border-stone-100 flex items-center justify-between bg-[#FAF8F5]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-700 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-xl font-bold text-stone-900 leading-tight">
                Kitchen Ingredient Substitutions
              </h2>
              <span className="text-xs text-stone-500">
                Culinary ratios, flavor profiles & why each swap works
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Category Filter */}
        <div className="p-6 border-b border-stone-100 space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search ingredient (e.g., Heavy Cream, Eggs, Parmesan, Butter, Soy Sauce)..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-stone-50 border border-stone-200 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
            />
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold capitalize shrink-0 transition-all ${
                  selectedCategory === cat
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Substitutions Cards Grid */}
        <div className="overflow-y-auto p-6 space-y-6 flex-1">
          {filteredItems.map(item => (
            <div
              key={item.ingredient}
              className="bg-[#FAF8F5] rounded-2xl p-5 border border-stone-200/90 space-y-4 shadow-2xs"
            >
              <div className="flex items-center justify-between pb-3 border-b border-stone-200/70">
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase tracking-wider text-amber-700 font-bold bg-amber-100/70 px-2.5 py-0.5 rounded-md">
                    {item.category}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-stone-900">
                    Missing: {item.ingredient}
                  </h3>
                </div>
                <span className="text-xs text-stone-500 font-medium">
                  {item.substitutes.length} smart alternatives
                </span>
              </div>

              {/* Substitutes List */}
              <div className="grid gap-3">
                {item.substitutes.map((sub, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-4 bg-white rounded-xl border border-stone-200 shadow-2xs space-y-2"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h4 className="text-sm font-bold text-stone-900 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{sub.name}</span>
                      </h4>
                      <span className="text-xs font-semibold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-md self-start sm:self-auto">
                        Ratio: {sub.ratio}
                      </span>
                    </div>

                    <p className="text-xs text-stone-600 leading-relaxed">
                      {sub.description}
                    </p>

                    <div className="pt-2 border-t border-stone-100 flex items-start gap-1.5 text-[11px] text-stone-500">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-stone-700">Why it works:</strong> {sub.whyItWorks}
                      </span>
                    </div>

                    {sub.tags && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {sub.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2 py-0.5 rounded-md bg-stone-100 text-[10px] text-stone-600 font-medium"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {filteredItems.length === 0 && (
            <div className="text-center py-12 text-stone-500 space-y-2">
              <p className="font-serif text-lg font-bold text-stone-800">
                No substitutions listed for "{searchQuery}"
              </p>
              <p className="text-xs text-stone-500">
                Try searching for common essentials like butter, heavy cream, parmesan, flour, eggs, or milk.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-stone-50 border-t border-stone-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs transition-colors"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
