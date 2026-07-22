'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, Sparkles, Sliders, RefreshCw } from 'lucide-react';
import { Prompt } from '@/types/prompt';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FavoriteButton } from '@/components/prompt/FavoriteButton';
import { extractPlaceholders } from '@/lib/utils';

interface PromptDetailModalProps {
  prompt: Prompt | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  isCopied: boolean;
  onCopy: (text: string, id: string) => void;
}

export function PromptDetailModal({
  prompt,
  isOpen,
  onClose,
  isFavorite,
  onToggleFavorite,
  isCopied,
  onCopy,
}: PromptDetailModalProps) {
  const [paramValues, setParamValues] = React.useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = React.useState<'customized' | 'template'>('customized');

  // Reset paramValues when selected prompt changes
  React.useEffect(() => {
    if (prompt?.id) {
      setParamValues({});
      setActiveTab('customized');
    }
  }, [prompt?.id]);

  // Extract placeholder names when prompt changes
  const placeholders = React.useMemo(() => {
    if (!prompt) return [];
    return extractPlaceholders(prompt.prompt);
  }, [prompt]);

  if (!isOpen || !prompt) return null;

  // Substitute parameter inputs into prompt body
  const getSubstitutedPrompt = () => {
    let result = prompt.prompt;
    Object.entries(paramValues).forEach(([key, value]) => {
      if (value.trim()) {
        result = result.replaceAll(`[${key}]`, value);
      }
    });
    return result;
  };

  const currentPromptText =
    activeTab === 'customized' ? getSubstitutedPrompt() : prompt.prompt;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-3xl rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden z-10 my-8"
        >
          {/* Top Gradient Stripe */}
          <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" />

          {/* Header */}
          <div className="p-6 pb-4 flex items-start justify-between gap-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="default">{prompt.category}</Badge>
                {prompt.complexity && (
                  <span className="text-xs text-slate-400">• {prompt.complexity}</span>
                )}
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                {prompt.title}
              </h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                {prompt.description}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <FavoriteButton
                id={prompt.id}
                isFavorite={isFavorite}
                onToggle={onToggleFavorite}
              />
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
            {/* Variable Parameter Inputs (if placeholders exist) */}
            {placeholders.length > 0 && (
              <div className="rounded-2xl bg-blue-50/50 dark:bg-slate-800/50 border border-blue-100 dark:border-slate-800 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 dark:text-blue-400">
                    <Sliders className="w-3.5 h-3.5" />
                    <span>Customize Prompt Variables ({placeholders.length})</span>
                  </div>
                  {Object.keys(paramValues).length > 0 && (
                    <button
                      onClick={() => setParamValues({})}
                      className="text-xs text-slate-500 hover:text-rose-500 flex items-center gap-1 transition-colors"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Reset Variables</span>
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {placeholders.map((param) => (
                    <div key={param} className="space-y-1">
                      <label className="text-xs font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1">
                        <span className="text-blue-500 font-mono">[{param}]</span>
                      </label>
                      <input
                        type="text"
                        value={paramValues[param] || ''}
                        onChange={(e) =>
                          setParamValues({
                            ...paramValues,
                            [param]: e.target.value,
                          })
                        }
                        placeholder={`Enter ${param}...`}
                        className="w-full h-9 px-3 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Code Output Header & Tabs */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                  <span>Prompt Output Body</span>
                </div>

                {placeholders.length > 0 && (
                  <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg text-xs">
                    <button
                      onClick={() => setActiveTab('customized')}
                      className={`px-2.5 py-1 rounded-md transition-all font-medium ${
                        activeTab === 'customized'
                          ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm font-semibold'
                          : 'text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      Filled Prompt
                    </button>
                    <button
                      onClick={() => setActiveTab('template')}
                      className={`px-2.5 py-1 rounded-md transition-all font-medium ${
                        activeTab === 'template'
                          ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm font-semibold'
                          : 'text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      Raw Template
                    </button>
                  </div>
                )}
              </div>

              {/* Code Box */}
              <div className="relative rounded-2xl bg-slate-950 p-4 text-slate-200 font-mono text-xs sm:text-sm border border-slate-800 shadow-inner overflow-x-auto">
                <pre className="whitespace-pre-wrap break-words leading-relaxed">
                  {currentPromptText}
                </pre>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-400 font-medium">Tags:</span>
              {prompt.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
            <p className="text-xs text-slate-400">
              Tip: Click Copy Prompt to copy directly into ChatGPT or Claude.
            </p>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={onClose}>
                Close
              </Button>
              <Button
                variant={isCopied ? 'secondary' : 'glow'}
                size="md"
                onClick={() => onCopy(currentPromptText, prompt.id)}
                className="gap-2 font-semibold"
              >
                {isCopied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Prompt</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
