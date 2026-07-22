'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Code,
  PenTool,
  BarChart,
  Zap,
  Briefcase,
  GraduationCap,
  Palette,
  Heart,
  LucideIcon,
} from 'lucide-react';
import { CATEGORIES } from '@/constants/categories';
import { CategoryType, Prompt } from '@/types/prompt';
import { cn } from '@/lib/utils';

const ICON_MAP: Record<string, LucideIcon> = {
  Sparkles,
  Code,
  PenTool,
  BarChart,
  Zap,
  Briefcase,
  GraduationCap,
  Palette,
};

interface CategoryFilterProps {
  currentCategory: CategoryType;
  onSelectCategory: (cat: CategoryType) => void;
  favoritesOnly: boolean;
  onToggleFavoritesOnly: () => void;
  allPrompts: Prompt[];
  favoritesCount: number;
}

export function CategoryFilter({
  currentCategory,
  onSelectCategory,
  favoritesOnly,
  onToggleFavoritesOnly,
  allPrompts,
  favoritesCount,
}: CategoryFilterProps) {
  // Calculate prompt counts per category
  const getCategoryCount = (catId: CategoryType) => {
    if (catId === 'All') return allPrompts.length;
    return allPrompts.filter((p) => p.category === catId).length;
  };

  return (
    <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
      {/* Category Pills Slider */}
      <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar max-w-full">
        {CATEGORIES.map((cat) => {
          const Icon = ICON_MAP[cat.iconName] || Sparkles;
          const isSelected = currentCategory === cat.id && !favoritesOnly;
          const count = getCategoryCount(cat.id);

          return (
            <button
              key={cat.id}
              onClick={() => {
                if (favoritesOnly) onToggleFavoritesOnly();
                onSelectCategory(cat.id);
              }}
              className={cn(
                'relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all shrink-0 cursor-pointer select-none',
                isSelected
                  ? 'text-white font-semibold shadow-md shadow-blue-500/20'
                  : 'text-slate-600 dark:text-slate-400 bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-slate-100'
              )}
            >
              {isSelected && (
                <motion.div
                  layoutId="activeCategoryTab"
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}

              <span className="relative z-10 flex items-center gap-1.5">
                <Icon className={cn('w-4 h-4', isSelected ? 'text-white' : 'text-slate-400')} />
                <span>{cat.name}</span>
                <span
                  className={cn(
                    'px-1.5 py-0.2 text-[10px] rounded-full font-mono',
                    isSelected
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-200/70 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                  )}
                >
                  {count}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Favorites Toggle Button */}
      <button
        onClick={onToggleFavoritesOnly}
        className={cn(
          'flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 border cursor-pointer select-none shadow-sm',
          favoritesOnly
            ? 'bg-rose-600 text-white border-rose-500 shadow-rose-500/30'
            : 'bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30'
        )}
      >
        <Heart
          className={cn('w-4 h-4 transition-transform', favoritesOnly ? 'fill-white scale-110' : 'fill-rose-500/20')}
        />
        <span>Favorites</span>
        <span
          className={cn(
            'px-1.5 py-0.2 text-[10px] rounded-full font-mono',
            favoritesOnly ? 'bg-white/20 text-white' : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
          )}
        >
          {favoritesCount}
        </span>
      </button>
    </div>
  );
}
