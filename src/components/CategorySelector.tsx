import React from 'react';
import { CATEGORIES } from '../data/words';
import { CategoryId, WordLengthFilter } from '../types/game';

interface CategorySelectorProps {
  selectedCategory: CategoryId;
  selectedLength: WordLengthFilter;
  onSelectCategory: (category: CategoryId) => void;
  onSelectLength: (length: WordLengthFilter) => void;
}

const LENGTH_OPTIONS: { value: WordLengthFilter; label: string }[] = [
  { value: 'all', label: 'Сите' },
  { value: 4, label: '4' },
  { value: 5, label: '5' },
  { value: 6, label: '6' },
  { value: 7, label: '7' },
  { value: '8+', label: '8+' },
];

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  selectedCategory,
  selectedLength,
  onSelectCategory,
  onSelectLength,
}) => {
  return (
    <div className="w-full space-y-2.5 bg-slate-900/80 border border-slate-800 rounded-2xl p-3">
      {/* Categories row (horizontally scrollable on mobile) */}
      <div>
        <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1.5 px-1">
          Категорија
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {CATEGORIES.map((cat) => {
            const active = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.id)}
                className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition ${
                  active
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.labelMk}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Word Length row */}
      <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-800/80">
        <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold px-1">
          Број на букви
        </span>
        <div className="flex gap-1">
          {LENGTH_OPTIONS.map((opt) => {
            const active = selectedLength === opt.value;
            return (
              <button
                key={String(opt.value)}
                type="button"
                onClick={() => onSelectLength(opt.value)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                  active
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
