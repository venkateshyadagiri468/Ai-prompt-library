'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Sparkles } from 'lucide-react';
import { CategoryType, Prompt } from '@/types/prompt';
import { CATEGORIES } from '@/constants/categories';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface CreatePromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPrompt: (newPrompt: Prompt) => void;
}

export function CreatePromptModal({
  isOpen,
  onClose,
  onAddPrompt,
}: CreatePromptModalProps) {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [category, setCategory] = React.useState<CategoryType>('Coding');
  const [tagsInput, setTagsInput] = React.useState('');
  const [promptBody, setPromptBody] = React.useState('');
  const [complexity, setComplexity] = React.useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !promptBody.trim()) return;

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const newPrompt: Prompt = {
      id: `custom-${Date.now()}`,
      title: title.trim(),
      description: description.trim() || title.trim(),
      category,
      tags: tags.length > 0 ? tags : ['Custom'],
      prompt: promptBody.trim(),
      favorite: true,
      isCustom: true,
      complexity,
      copies: 1,
    };

    onAddPrompt(newPrompt);
    // Reset form
    setTitle('');
    setDescription('');
    setTagsInput('');
    setPromptBody('');
    onClose();
  };

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
          className="relative w-full max-w-2xl rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden z-10 my-8"
        >
          {/* Top Gradient Stripe */}
          <div className="h-1.5 w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500" />

          {/* Header */}
          <div className="p-6 pb-4 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Add Custom Prompt
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Add your own battle-tested system prompt to your vault
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Prompt Title *
              </label>
              <Input
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Next.js 15 Server Action Generator"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as CategoryType)}
                  className="w-full h-11 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                >
                  {CATEGORIES.filter((c) => c.id !== 'All').map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Complexity
                </label>
                <select
                  value={complexity}
                  onChange={(e) =>
                    setComplexity(e.target.value as 'Beginner' | 'Intermediate' | 'Advanced')
                  }
                  className="w-full h-11 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Short Description
              </label>
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief summary of what this prompt accomplishes..."
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Tags (comma separated)
              </label>
              <Input
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="Next.js, Server Actions, TypeScript, React"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Prompt Body * (Use [Placeholder Name] for dynamic inputs)
              </label>
              <textarea
                required
                rows={5}
                value={promptBody}
                onChange={(e) => setPromptBody(e.target.value)}
                placeholder="Act as a Senior Architect... Provide code for [Feature Name] using [Tech Stack]..."
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 text-xs sm:text-sm text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>

            {/* Actions */}
            <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100 dark:border-slate-800">
              <Button type="button" variant="outline" size="sm" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" variant="glow" size="md" className="gap-2 font-semibold">
                <Plus className="w-4 h-4" />
                <span>Save to Prompt Vault</span>
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
