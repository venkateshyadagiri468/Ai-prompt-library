'use client';

import * as React from 'react';
import { Sparkles, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200/80 dark:border-slate-800/80 bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div className="space-y-2">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-blue-600 text-white">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-slate-900 dark:text-white tracking-tight">
              AI Prompt Vault
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Open-source prompt engineering library built with Next.js 15, TypeScript & Tailwind CSS.
          </p>
        </div>

        <div className="flex items-center gap-6 text-xs text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1">
            Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for AI Engineers
          </span>
        </div>
      </div>
    </footer>
  );
}
