'use client';

import * as React from 'react';
import { SearchX, RotateCcw, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  searchQuery: string;
  onReset: () => void;
  onOpenCreate: () => void;
}

export function EmptyState({ searchQuery, onReset, onOpenCreate }: EmptyStateProps) {
  return (
    <div className="w-full py-16 px-4 flex flex-col items-center justify-center text-center bg-white/40 dark:bg-slate-900/40 rounded-3xl border border-dashed border-slate-300 dark:border-slate-800">
      <div className="w-16 h-16 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center mb-4 animate-bounce">
        <SearchX className="w-8 h-8" />
      </div>

      <h3 className="text-xl font-bold text-slate-900 dark:text-white">
        No Prompts Found
      </h3>

      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-md">
        {searchQuery ? (
          <>
            No prompts matched your search query <span className="font-semibold text-slate-700 dark:text-slate-300">&quot;{searchQuery}&quot;</span>. Try adjusting your search term or clearing filters.
          </>
        ) : (
          'No prompts match the selected category or filter criteria.'
        )}
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Button onClick={onReset} variant="outline" size="sm" className="gap-2">
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All Filters</span>
        </Button>

        <Button onClick={onOpenCreate} variant="glow" size="sm" className="gap-2">
          <Plus className="w-3.5 h-3.5" />
          <span>Create Custom Prompt</span>
        </Button>
      </div>
    </div>
  );
}
