/**
 * Supported Domain Category Taxonomy
 */
export type CategoryType = 
  | 'All'
  | 'Coding' 
  | 'Writing' 
  | 'Marketing' 
  | 'Productivity' 
  | 'Business' 
  | 'Learning' 
  | 'Creative';

/**
 * Core Prompt Data Interface Structure
 */
export interface Prompt {
  id: string;
  title: string;
  description: string;
  category: CategoryType;
  tags: string[];
  prompt: string;
  favorite?: boolean;
  isCustom?: boolean;
  author?: string;
  complexity?: 'Beginner' | 'Intermediate' | 'Advanced';
  views?: number;
  copies?: number;
}

/**
 * Global Search & Filter State Interface
 */
export interface PromptFilterState {
  searchQuery: string;
  category: CategoryType;
  selectedTag: string | null;
  favoritesOnly: boolean;
  sortBy: 'popular' | 'newest' | 'alphabetical';
}
