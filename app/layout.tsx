import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/providers/ThemeProvider';

const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const fontMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'AI Prompt Vault | Curated Production-Grade System Prompts',
  description:
    'A modern prompt management application to browse, search, filter, favorite, and copy battle-tested AI system prompts for ChatGPT, Claude, and DeepSeek.',
  keywords: [
    'AI Prompts',
    'Prompt Engineering',
    'ChatGPT System Prompts',
    'Claude Prompts',
    'Developer Prompts',
    'Next.js 15',
  ],
  authors: [{ name: 'AI Prompt Vault Team' }],
  openGraph: {
    title: 'AI Prompt Vault | Curated Prompt Library',
    description:
      'Search, filter, favorite, and copy production-ready system prompts for AI models.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fontSans.variable} ${fontMono.variable}`}
    >
      <body className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans antialiased selection:bg-blue-500/20 selection:text-blue-600">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
