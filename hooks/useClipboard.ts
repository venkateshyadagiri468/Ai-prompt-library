import { useState, useCallback } from 'react';
import confetti from 'canvas-confetti';

interface UseClipboardOptions {
  timeout?: number;
  triggerConfetti?: boolean;
}

export function useClipboard(options: UseClipboardOptions = {}) {
  const { timeout = 2000, triggerConfetti = true } = options;
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = useCallback(
    async (text: string, id: string = 'default') => {
      if (!navigator?.clipboard) {
        console.warn('Clipboard API not supported');
        return false;
      }

      try {
        await navigator.clipboard.writeText(text);
        setCopiedId(id);

        if (triggerConfetti) {
          confetti({
            particleCount: 40,
            spread: 60,
            origin: { y: 0.8 },
            colors: ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'],
          });
        }

        setTimeout(() => {
          setCopiedId((current) => (current === id ? null : current));
        }, timeout);

        return true;
      } catch (error) {
        console.error('Failed to copy to clipboard', error);
        return false;
      }
    },
    [timeout, triggerConfetti]
  );

  return { copyToClipboard, copiedId };
}
