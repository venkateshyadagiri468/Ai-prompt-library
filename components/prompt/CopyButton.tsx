'use client';

import * as React from 'react';
import { Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface CopyButtonProps {
  promptText: string;
  id: string;
  isCopied: boolean;
  onCopy: (text: string, id: string) => void;
  className?: string;
  size?: 'sm' | 'md';
}

export function CopyButton({
  promptText,
  id,
  isCopied,
  onCopy,
  className,
  size = 'sm',
}: CopyButtonProps) {
  return (
    <Button
      onClick={(e) => {
        e.stopPropagation();
        onCopy(promptText, id);
      }}
      variant={isCopied ? 'secondary' : 'default'}
      size={size}
      className={cn(
        'gap-1.5 font-semibold transition-all duration-200',
        isCopied
          ? 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-md shadow-emerald-500/20'
          : '',
        className
      )}
    >
      {isCopied ? (
        <>
          <Check className="w-3.5 h-3.5 animate-bounce" />
          <span>Copied!</span>
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5" />
          <span>Copy Prompt</span>
        </>
      )}
    </Button>
  );
}
