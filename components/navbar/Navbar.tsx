'use client';

import * as React from 'react';
import { Sparkles, Terminal, Heart, Plus, Search } from 'lucide-react';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface NavbarProps {
  totalPrompts: number;
  favoritesCount: number;
  onOpenCreate: () => void;
  onFocusSearch: () => void;
}

export function Navbar({
  totalPrompts,
  favoritesCount,
  onOpenCreate,
  onFocusSearch,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/75 dark:bg-slate-950/75 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 text-white shadow-md shadow-blue-500/20 group cursor-pointer">
            <Sparkles className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-800 dark:from-white dark:via-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                AI Prompt Vault
              </span>
              <Badge variant="accent" className="hidden sm:inline-flex text-[10px] py-0 px-2">
                v1.0 MVP
              </Badge>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 hidden md:block">
              Curated Production-Grade System Prompts
            </p>
          </div>
        </div>

        {/* Quick Actions & Stats */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onFocusSearch}
            className="hidden lg:flex items-center gap-2 text-xs text-slate-400 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 py-1.5 rounded-lg hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search prompts...</span>
            <kbd className="font-mono bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700 text-[10px]">
              ⌘K
            </kbd>
          </button>

          <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 bg-slate-100/70 dark:bg-slate-900/70 px-3 py-1.5 rounded-lg border border-slate-200/50 dark:border-slate-800/50">
            <Terminal className="w-3.5 h-3.5 text-blue-500" />
            <span className="font-semibold text-slate-900 dark:text-slate-100">
              {totalPrompts}
            </span>
            <span>Prompts</span>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500/20" />
            <span className="font-semibold text-slate-900 dark:text-slate-100">
              {favoritesCount}
            </span>
          </div>

          <Button
            onClick={onOpenCreate}
            size="sm"
            variant="glow"
            className="gap-1.5 text-xs font-semibold"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Prompt</span>
          </Button>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
