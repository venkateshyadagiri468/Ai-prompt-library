'use client';

import * as React from 'react';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FavoriteButtonProps {
  id: string;
  isFavorite: boolean;
  onToggle: (id: string) => void;
  className?: string;
}

export function FavoriteButton({
  id,
  isFavorite,
  onToggle,
  className,
}: FavoriteButtonProps) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onToggle(id);
      }}
      className={cn(
        'p-2 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rose-500/50 cursor-pointer',
        isFavorite
          ? 'bg-rose-500/10 text-rose-500 dark:bg-rose-500/20'
          : 'bg-slate-100/80 dark:bg-slate-800/80 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-slate-800',
        className
      )}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Heart
        className={cn(
          'w-4 h-4 transition-transform duration-200 active:scale-125',
          isFavorite ? 'fill-rose-500 text-rose-500' : 'fill-none'
        )}
      />
    </button>
  );
}
