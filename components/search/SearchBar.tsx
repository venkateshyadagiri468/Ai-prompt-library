'use client';

import * as React from 'react';
import { Search, X, SlidersHorizontal, Tag } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedTag: string | null;
  setSelectedTag: (tag: string | null) => void;
  allTags: string[];
  sortBy: 'popular' | 'newest' | 'alphabetical';
  setSortBy: (sort: 'popular' | 'newest' | 'alphabetical') => void;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}

export function SearchBar({
  searchQuery,
  setSearchQuery,
  selectedTag,
  setSelectedTag,
  allTags,
  sortBy,
  setSortBy,
  inputRef,
}: SearchBarProps) {
  const localInputRef = React.useRef<HTMLInputElement>(null);
  const refToUse = inputRef || localInputRef;

  // Keyboard shortcut listener (Cmd+K or Ctrl+K or /)
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        refToUse.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [refToUse]);

  return (
    <div className="w-full space-y-3">
      <div className="relative flex items-center gap-2">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
            <Search className="w-4 h-4" />
          </div>

          <Input
            ref={refToUse}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, prompt body, tags (e.g. Refactoring, SaaS, Zod)..."
            className="pl-10 pr-20 h-12 text-sm sm:text-base rounded-2xl bg-white dark:bg-slate-900 shadow-md shadow-slate-200/50 dark:shadow-none border-slate-200 dark:border-slate-800"
          />

          {searchQuery ? (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <div className="absolute inset-y-0 right-3 hidden sm:flex items-center pointer-events-none">
              <kbd className="font-mono text-xs text-slate-400 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded-md">
                ⌘K
              </kbd>
            </div>
          )}
        </div>

        {/* Sort Selector */}
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value as 'popular' | 'newest' | 'alphabetical')
            }
            className="h-12 px-3 pr-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 cursor-pointer shadow-md shadow-slate-200/50 dark:shadow-none appearance-none"
          >
            <option value="popular">🔥 Most Popular</option>
            <option value="alphabetical">🔤 Alphabetical</option>
          </select>
          <SlidersHorizontal className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {/* Suggested Tags Row */}
      {allTags.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
          <div className="flex items-center gap-1 text-slate-400 dark:text-slate-500 shrink-0 font-medium pl-1">
            <Tag className="w-3 h-3" />
            <span>Tags:</span>
          </div>

          {selectedTag && (
            <button
              onClick={() => setSelectedTag(null)}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 font-semibold border border-rose-500/20 shrink-0 hover:bg-rose-500/20 transition-colors"
            >
              <span>Reset Tag</span>
              <X className="w-3 h-3" />
            </button>
          )}

          {allTags.slice(0, 10).map((tag) => {
            const isSelected = selectedTag === tag;
            return (
              <button
                key={tag}
                onClick={() => setSelectedTag(isSelected ? null : tag)}
                className={`px-2.5 py-1 rounded-full text-xs font-medium shrink-0 transition-all ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30 font-semibold'
                    : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                #{tag}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
