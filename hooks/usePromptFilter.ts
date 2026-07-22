import { useState, useMemo } from 'react';
import { Prompt, CategoryType } from '@/types/prompt';

export function usePromptFilter(allPrompts: Prompt[], favoriteIds: Set<string>) {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState<CategoryType>('All');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'popular' | 'newest' | 'alphabetical'>('popular');

  const filteredPrompts = useMemo(() => {
    let result = [...allPrompts];

    // Filter by Category
    if (category !== 'All') {
      result = result.filter((p) => p.category === category);
    }

    // Filter by Favorites
    if (favoritesOnly) {
      result = result.filter((p) => favoriteIds.has(p.id));
    }

    // Filter by Tag
    if (selectedTag) {
      result = result.filter((p) => p.tags.includes(selectedTag));
    }

    // Filter by Search Query (title, description, tags, prompt body)
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          p.prompt.toLowerCase().includes(q)
      );
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'popular') {
        return (b.copies || 0) - (a.copies || 0);
      }
      if (sortBy === 'alphabetical') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

    return result;
  }, [allPrompts, category, favoritesOnly, selectedTag, searchQuery, sortBy, favoriteIds]);

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    allPrompts.forEach((p) => p.tags.forEach((t) => tagSet.add(t)));
    return Array.from(tagSet);
  }, [allPrompts]);

  const resetFilters = () => {
    setSearchQuery('');
    setCategory('All');
    setSelectedTag(null);
    setFavoritesOnly(false);
  };

  return {
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
  };
}
