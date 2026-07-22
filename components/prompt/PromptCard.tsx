'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Maximize2, Share2 } from 'lucide-react';
import { Prompt } from '@/types/prompt';
import { CATEGORIES } from '@/constants/categories';
import { Badge } from '@/components/ui/badge';
import { CopyButton } from '@/components/prompt/CopyButton';
import { FavoriteButton } from '@/components/prompt/FavoriteButton';

interface PromptCardProps {
  prompt: Prompt;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  isCopied: boolean;
  onCopy: (text: string, id: string) => void;
  onSelectCard: (prompt: Prompt) => void;
  onShare: (prompt: Prompt) => void;
  onSelectTag: (tag: string) => void;
}

export function PromptCard({
  prompt,
  isFavorite,
  onToggleFavorite,
  isCopied,
  onCopy,
  onSelectCard,
  onShare,
  onSelectTag,
}: PromptCardProps) {
  const catInfo = CATEGORIES.find((c) => c.id === prompt.category) || CATEGORIES[0];

  // Formats text with highlight for placeholders like [Topic]
  const renderHighlightedPrompt = (text: string) => {
    const parts = text.split(/(\[.*?\])/g);
    return parts.slice(0, 8).map((part, index) => {
      if (part.startsWith('[') && part.endsWith(']')) {
        return (
          <span
            key={index}
            className="inline-block px-1 py-0.2 mx-0.5 rounded bg-blue-500/20 text-blue-600 dark:text-blue-300 font-semibold font-mono text-[11px]"
          >
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -10 }}
      transition={{ duration: 0.25 }}
      onClick={() => onSelectCard(prompt)}
      className="group relative flex flex-col justify-between h-full rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
    >
      {/* Top Accent Gradient Border */}
      <div
        className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${catInfo.gradient} opacity-80 group-hover:opacity-100 transition-opacity`}
      />

      <div>
        {/* Top Header Row: Category Badge + Complexity + Favorite */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge className={`${catInfo.badgeBg} ${catInfo.badgeText}`}>
              <span>{prompt.category}</span>
            </Badge>

            {prompt.complexity && (
              <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500">
                • {prompt.complexity}
              </span>
            )}

            {prompt.isCustom && (
              <Badge variant="accent" className="text-[10px] py-0 px-1.5">
                Custom
              </Badge>
            )}
          </div>

          <FavoriteButton
            id={prompt.id}
            isFavorite={isFavorite}
            onToggle={onToggleFavorite}
          />
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {prompt.title}
        </h3>

        {/* Description */}
        <p className="mt-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
          {prompt.description}
        </p>

        {/* Formatted Code Block Preview */}
        <div className="mt-4 relative rounded-xl bg-slate-950 p-3 text-xs text-slate-300 font-mono overflow-hidden border border-slate-800 shadow-inner group-hover:border-slate-700 transition-colors">
          <div className="line-clamp-3 leading-relaxed opacity-90">
            {renderHighlightedPrompt(prompt.prompt)}
          </div>
          <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-slate-950 to-transparent" />
        </div>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {prompt.tags.map((tag) => (
            <button
              key={tag}
              onClick={(e) => {
                e.stopPropagation();
                onSelectTag(tag);
              }}
              className="text-[11px] text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/60 hover:bg-slate-200 dark:hover:bg-slate-800 px-2 py-0.5 rounded-md transition-colors"
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onShare(prompt);
            }}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
            title="Share Prompt"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelectCard(prompt);
            }}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors flex items-center gap-1 text-[11px]"
            title="Expand Full Prompt"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">View</span>
          </button>
        </div>

        <CopyButton
          promptText={prompt.prompt}
          id={prompt.id}
          isCopied={isCopied}
          onCopy={onCopy}
        />
      </div>
    </motion.div>
  );
}
