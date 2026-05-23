// src/data/posts.ts
import postsData from './posts.json';

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  tags: string[];
  date: string;          // ISO YYYY-MM-DD
  readingTime: number;   // minutes
  featured: boolean;
  content: string;       // Markdown
}

/** All posts, newest date first. */
export const posts: Post[] = (postsData as Post[])
  .slice()
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

/** Look up a single post by slug. */
export function getPost(slug: string): Post | undefined {
  return posts.find(p => p.slug === slug);
}

/** Unique tag list with "All" prepended — for filter UIs. */
export function getTags(): string[] {
  const set = new Set<string>();
  posts.forEach(p => p.tags.forEach(t => set.add(t)));
  return ['All', ...Array.from(set).sort()];
}

/** Previous / next post relative to a slug. */
export function getAdjacentPosts(slug: string): {
  prev: Post | null;
  next: Post | null;
} {
  const i = posts.findIndex(p => p.slug === slug);
  if (i === -1) return { prev: null, next: null };
  return {
    prev: i > 0 ? posts[i - 1] : null,
    next: i < posts.length - 1 ? posts[i + 1] : null,
  };
}

/** Estimate reading time from Markdown content (~200 wpm). */
export function estimateReadingTime(markdown: string): number {
  const words = markdown.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

/** Turn a title into a URL-safe slug. */
export function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

/** Format an ISO date for display. */
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}