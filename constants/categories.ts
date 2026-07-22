import { CategoryType } from '@/types/prompt';

export interface CategoryInfo {
  id: CategoryType;
  name: string;
  iconName: string;
  description: string;
  gradient: string;
  badgeBg: string;
  badgeText: string;
  accentBorder: string;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'All',
    name: 'All Prompts',
    iconName: 'Sparkles',
    description: 'Browse the complete vault of optimized AI system prompts',
    gradient: 'from-blue-500 to-indigo-600',
    badgeBg: 'bg-blue-500/10 dark:bg-blue-500/20',
    badgeText: 'text-blue-600 dark:text-blue-400',
    accentBorder: 'hover:border-blue-500/50',
  },
  {
    id: 'Coding',
    name: 'Coding',
    iconName: 'Code',
    description: 'Refactoring, debugging, system design, and API generators',
    gradient: 'from-cyan-500 to-blue-600',
    badgeBg: 'bg-cyan-500/10 dark:bg-cyan-500/20',
    badgeText: 'text-cyan-600 dark:text-cyan-400',
    accentBorder: 'hover:border-cyan-500/50',
  },
  {
    id: 'Writing',
    name: 'Writing',
    iconName: 'PenTool',
    description: 'Copywriting, blog posts, email sequences, and storytelling',
    gradient: 'from-purple-500 to-pink-600',
    badgeBg: 'bg-purple-500/10 dark:bg-purple-500/20',
    badgeText: 'text-purple-600 dark:text-purple-400',
    accentBorder: 'hover:border-purple-500/50',
  },
  {
    id: 'Marketing',
    name: 'Marketing',
    iconName: 'BarChart',
    description: 'SEO strategy, product launches, ad copy, and growth hacks',
    gradient: 'from-emerald-500 to-teal-600',
    badgeBg: 'bg-emerald-500/10 dark:bg-emerald-500/20',
    badgeText: 'text-emerald-600 dark:text-emerald-400',
    accentBorder: 'hover:border-emerald-500/50',
  },
  {
    id: 'Productivity',
    name: 'Productivity',
    iconName: 'Zap',
    description: 'Task prioritization, summary synthesis, and meeting notes',
    gradient: 'from-amber-500 to-orange-600',
    badgeBg: 'bg-amber-500/10 dark:bg-amber-500/20',
    badgeText: 'text-amber-600 dark:text-amber-400',
    accentBorder: 'hover:border-amber-500/50',
  },
  {
    id: 'Business',
    name: 'Business',
    iconName: 'Briefcase',
    description: 'Pitch decks, business plans, financial models, and strategy',
    gradient: 'from-indigo-500 to-purple-600',
    badgeBg: 'bg-indigo-500/10 dark:bg-indigo-500/20',
    badgeText: 'text-indigo-600 dark:text-indigo-400',
    accentBorder: 'hover:border-indigo-500/50',
  },
  {
    id: 'Learning',
    name: 'Learning',
    iconName: 'GraduationCap',
    description: 'Feynman technique, concept breakdown, and quiz generation',
    gradient: 'from-rose-500 to-pink-600',
    badgeBg: 'bg-rose-500/10 dark:bg-rose-500/20',
    badgeText: 'text-rose-600 dark:text-rose-400',
    accentBorder: 'hover:border-rose-500/50',
  },
  {
    id: 'Creative',
    name: 'Creative',
    iconName: 'Palette',
    description: 'Midjourney/DALL-E prompts, UI mockups, and video scripts',
    gradient: 'from-fuchsia-500 to-violet-600',
    badgeBg: 'bg-fuchsia-500/10 dark:bg-fuchsia-500/20',
    badgeText: 'text-fuchsia-600 dark:text-fuchsia-400',
    accentBorder: 'hover:border-fuchsia-500/50',
  },
];
