'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, ShieldCheck, Copy, BookOpen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface HeroProps {
  totalPrompts: number;
  totalCategories: number;
  totalCopies: number;
}

export function Hero({ totalPrompts, totalCategories, totalCopies }: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-12 pb-8 sm:pt-16 sm:pb-12 text-center">
      {/* Decorative Glow Background Spheres */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[600px] h-[350px] bg-gradient-to-tr from-blue-500/20 via-indigo-500/20 to-purple-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Animated Feature Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 mb-6"
        >
          <Badge
            variant="accent"
            className="px-3 py-1 text-xs sm:text-sm font-medium rounded-full backdrop-blur-sm shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
            <span>Engineered for Claude, ChatGPT & DeepSeek</span>
          </Badge>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]"
        >
          Discover & Deploy{' '}
          <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 dark:from-blue-400 dark:via-indigo-300 dark:to-purple-400 bg-clip-text text-transparent">
            Battle-Tested AI Prompts
          </span>
        </motion.h1>

        {/* Hero Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 sm:mt-6 text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed"
        >
          Stop writing prompts from scratch. Access optimized, high-impact system instructions for coding, copywriting, marketing, and analytical workflows.
        </motion.p>

        {/* Stats Pill Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-slate-600 dark:text-slate-400"
        >
          <div className="flex items-center gap-2 bg-white/60 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 px-4 py-2 rounded-xl backdrop-blur-sm shadow-sm">
            <BookOpen className="w-4 h-4 text-blue-500" />
            <span className="font-bold text-slate-900 dark:text-white">{totalPrompts}+</span>
            <span>Curated Prompts</span>
          </div>

          <div className="flex items-center gap-2 bg-white/60 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 px-4 py-2 rounded-xl backdrop-blur-sm shadow-sm">
            <Zap className="w-4 h-4 text-amber-500" />
            <span className="font-bold text-slate-900 dark:text-white">{totalCategories}</span>
            <span>Domain Categories</span>
          </div>

          <div className="flex items-center gap-2 bg-white/60 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 px-4 py-2 rounded-xl backdrop-blur-sm shadow-sm">
            <Copy className="w-4 h-4 text-emerald-500" />
            <span className="font-bold text-slate-900 dark:text-white">{totalCopies.toLocaleString()}+</span>
            <span>One-Click Copies</span>
          </div>

          <div className="flex items-center gap-2 bg-white/60 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 px-4 py-2 rounded-xl backdrop-blur-sm shadow-sm">
            <ShieldCheck className="w-4 h-4 text-purple-500" />
            <span>100% Free & Open Source</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
