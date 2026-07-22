'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Prompt } from '@/types/prompt';
import { PromptCard } from '@/components/prompt/PromptCard';

interface PromptGridProps {
  prompts: Prompt[];
  favoriteIds: Set<string>;
  onToggleFavorite: (id: string) => void;
  copiedId: string | null;
  onCopy: (text: string, id: string) => void;
  onSelectCard: (prompt: Prompt) => void;
  onShare: (prompt: Prompt) => void;
  onSelectTag: (tag: string) => void;
}

export function PromptGrid({
  prompts,
  favoriteIds,
  onToggleFavorite,
  copiedId,
  onCopy,
  onSelectCard,
  onShare,
  onSelectTag,
}: PromptGridProps) {
  return (
    <div className="w-full">
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
      >
        <AnimatePresence mode="popLayout">
          {prompts.map((prompt) => (
            <PromptCard
              key={prompt.id}
              prompt={prompt}
              isFavorite={favoriteIds.has(prompt.id)}
              onToggleFavorite={onToggleFavorite}
              isCopied={copiedId === prompt.id}
              onCopy={onCopy}
              onSelectCard={onSelectCard}
              onShare={onShare}
              onSelectTag={onSelectTag}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
