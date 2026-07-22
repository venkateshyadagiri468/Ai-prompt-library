'use client';

import * as React from 'react';
import initialPrompts from '@/data/prompts.json';
import { Prompt } from '@/types/prompt';
import { Navbar } from '@/components/navbar/Navbar';
import { Hero } from '@/components/common/Hero';
import { SearchBar } from '@/components/search/SearchBar';
import { CategoryFilter } from '@/components/filters/CategoryFilter';
import { PromptGrid } from '@/components/prompt/PromptGrid';
import { PromptDetailModal } from '@/components/prompt/PromptDetailModal';
import { CreatePromptModal } from '@/components/prompt/CreatePromptModal';
import { EmptyState } from '@/components/common/EmptyState';
import { Footer } from '@/components/common/Footer';
import { useClipboard } from '@/hooks/useClipboard';
import { useFavorites } from '@/hooks/useFavorites';
import { usePromptFilter } from '@/hooks/usePromptFilter';
import { CATEGORIES } from '@/constants/categories';

const CUSTOM_PROMPTS_KEY = 'ai_prompt_vault_custom_prompts';

export default function HomePage() {
  // Local state for prompts (preloaded JSON + localStorage custom prompts)
  const [prompts, setPrompts] = React.useState<Prompt[]>(() => {
    if (typeof window === 'undefined') return initialPrompts as Prompt[];
    try {
      const stored = localStorage.getItem(CUSTOM_PROMPTS_KEY);
      if (stored) {
        const custom: Prompt[] = JSON.parse(stored);
        return [...custom, ...(initialPrompts as Prompt[])];
      }
    } catch {
      // Fallback
    }
    return initialPrompts as Prompt[];
  });

  // Custom Hooks
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const { copyToClipboard, copiedId } = useClipboard({ triggerConfetti: true });
  const {
    searchQuery,
    setSearchQuery,
    category,
    setCategory,
    selectedTag,
    setSelectedTag,
    favoritesOnly,
    setFavoritesOnly,
    sortBy,
    setSortBy,
    filteredPrompts,
    allTags,
    resetFilters,
  } = usePromptFilter(prompts, favorites);

  // Modals state
  const [selectedPrompt, setSelectedPrompt] = React.useState<Prompt | null>(null);
  const [isDetailOpen, setIsDetailOpen] = React.useState(false);
  const [isCreateOpen, setIsCreateOpen] = React.useState(false);

  // Toast notification state
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  const searchInputRef = React.useRef<HTMLInputElement>(null);

  // Focus search helper
  const handleFocusSearch = () => {
    searchInputRef.current?.focus();
  };

  // Handle Card selection
  const handleSelectCard = (prompt: Prompt) => {
    setSelectedPrompt(prompt);
    setIsDetailOpen(true);
  };

  // Handle Adding Custom Prompt
  const handleAddCustomPrompt = (newPrompt: Prompt) => {
    setPrompts((prev) => {
      const updated = [newPrompt, ...prev];
      try {
        const customOnly = updated.filter((p) => p.isCustom);
        localStorage.setItem(CUSTOM_PROMPTS_KEY, JSON.stringify(customOnly));
      } catch (e) {
        console.warn('Failed to save custom prompt to localStorage', e);
      }
      return updated;
    });

    // Auto favorite the user's custom prompt
    toggleFavorite(newPrompt.id);
    showToast(`Added "${newPrompt.title}" to your prompt vault!`);
  };

  // Handle Sharing Prompt
  const handleSharePrompt = async (prompt: Prompt) => {
    const shareText = `Check out this AI Prompt: "${prompt.title}"\n\n${prompt.prompt}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: prompt.title,
          text: shareText,
          url: window.location.href,
        });
        showToast('Shared successfully!');
        return;
      } catch {
        // Fallback to copy
      }
    }
    await copyToClipboard(shareText, `share-${prompt.id}`);
    showToast('Prompt link & text copied to clipboard!');
  };

  // Helper for floating toasts
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Calculate stats
  const totalCopies = React.useMemo(() => {
    return prompts.reduce((acc, p) => acc + (p.copies || 0), 0);
  }, [prompts]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors">
      {/* Top Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce">
          <div className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 dark:border-slate-200 text-xs sm:text-sm font-semibold flex items-center gap-2">
            <span>✨</span>
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Navbar Header */}
      <Navbar
        totalPrompts={prompts.length}
        favoritesCount={favorites.size}
        onOpenCreate={() => setIsCreateOpen(true)}
        onFocusSearch={handleFocusSearch}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Hero Section */}
        <Hero
          totalPrompts={prompts.length}
          totalCategories={CATEGORIES.length - 1}
          totalCopies={totalCopies}
        />

        {/* Search & Filtering Control Bar */}
        <section className="space-y-4">
          <SearchBar
            inputRef={searchInputRef}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedTag={selectedTag}
            setSelectedTag={setSelectedTag}
            allTags={allTags}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />

          <CategoryFilter
            currentCategory={category}
            onSelectCategory={setCategory}
            favoritesOnly={favoritesOnly}
            onToggleFavoritesOnly={() => setFavoritesOnly(!favoritesOnly)}
            allPrompts={prompts}
            favoritesCount={favorites.size}
          />
        </section>

        {/* Prompt Grid / Empty State */}
        <section className="pt-2">
          {filteredPrompts.length > 0 ? (
            <PromptGrid
              prompts={filteredPrompts}
              favoriteIds={favorites}
              onToggleFavorite={toggleFavorite}
              copiedId={copiedId}
              onCopy={(text, id) => {
                copyToClipboard(text, id);
                showToast('Copied prompt to clipboard!');
              }}
              onSelectCard={handleSelectCard}
              onShare={handleSharePrompt}
              onSelectTag={setSelectedTag}
            />
          ) : (
            <EmptyState
              searchQuery={searchQuery}
              onReset={resetFilters}
              onOpenCreate={() => setIsCreateOpen(true)}
            />
          )}
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Detail Modal */}
      <PromptDetailModal
        prompt={selectedPrompt}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        isFavorite={selectedPrompt ? isFavorite(selectedPrompt.id) : false}
        onToggleFavorite={toggleFavorite}
        isCopied={selectedPrompt ? copiedId === selectedPrompt.id : false}
        onCopy={(text, id) => {
          copyToClipboard(text, id);
          showToast('Copied prompt to clipboard!');
        }}
      />

      {/* Add Custom Prompt Modal */}
      <CreatePromptModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onAddPrompt={handleAddCustomPrompt}
      />
    </div>
  );
}
